import { Server } from 'node-osc'
import { internalIP } from '../helpers/ipAddress.js';
import { FACE_OSC_PORT, handleMessagePack } from './faceOSC.js';

const oscServer = new Server(FACE_OSC_PORT, 'localhost');

oscServer.on('message', (msg) => {
  console.log(`Message: ${msg}`);
  
  const [address, ...args] = msg;

  if (address === '/pose/position') {
    console.log(`Received OSC message at ${address}: ${args}`);
  }
})

oscServer.on('bundle', (bundle) => {
  bundle.elements.forEach((element, i) => {
    const messagePack = element.toString().split(',');
    const address = messagePack.splice(0, 1)[0];
    handleMessagePack(address, messagePack);
  })
})

oscServer.on('listening', () => {
  console.log("======== OSC SERVER RUNNING");
  console.log(`Listening On PORT : ${internalIP}:${FACE_OSC_PORT}\n`);
})

export { oscServer } 