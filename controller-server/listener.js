import { Server } from 'node-osc';

const FACE_OSC_PORT = 12345;


const oscServer = new Server(FACE_OSC_PORT, 'localhost', () => {
  console.log(`OSC Server is listening on : ${FACE_OSC_PORT}`);
})


oscServer.on('message', function (msg) {
  console.log(`Message: ${msg}`);
})





