import { Server } from 'node-osc'
console.log('Imported : node-osc.ts');

const FACE_OSC_PORT = 12300;

const oscServer = new Server(FACE_OSC_PORT, 'localhost', () => {
  console.log('OSC Server is listening');
})


oscServer.on('message', (msg) => {
  console.log(`Message: ${msg}`);
  
  const [address, ...args] = msg;

  if (address === '/pose/position') {
    console.log(`Received OSC message at ${address}: ${args}`);
  }
})


oscServer.on('bundle', (bundle) => {
  console.log(' === BUNDLE RECEIVED ===');

  bundle.elements.forEach((element, i) => {
    console.log('\n');
    const messagePack = element.toString().split(',');
    const address = messagePack[0];
    console.log(messagePack);
  })
})





export {
  oscServer
} 