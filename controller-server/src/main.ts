import https from 'https';
import fs from 'fs';
import configs from './configs/index.js';
import { expressApp } from './express/index.js';
import { internalIP } from './helpers/ipAddress.js';
import { getFileURL } from './helpers/fileSystem.js';

import { createSocket } from './socket/index.js';
import { useNamespace_chat } from './socket/namespaces/chat.js';



// import { osc } from './osc/another.js';
// osc.open({ port: 12300 });


import { oscServer } from './osc/node-osc.js';
console.log( typeof oscServer );





// Make Server with ExpressApp & TLS Certificate.
// Express Endpoints - SEE express/index.ts

const keyFile = getFileURL('configs/certificates/cert-key.pem');
const certFile = getFileURL('configs/certificates/fullchain.pem');
const httpsOptions = {
  key: fs.readFileSync(keyFile),
  cert: fs.readFileSync(certFile)
} satisfies https.ServerOptions;
const server = https.createServer(httpsOptions, expressApp);


// START SERVER

const { PORT_BACKEND } = configs.project.connection;
server.listen(PORT_BACKEND, () => {
  console.log('======== SERVER RUNNING ========')
  console.log(` - https://localhost:${PORT_BACKEND}`);
  console.log(` - https://${internalIP}:${PORT_BACKEND}\n\n`);
});


// USE SOCKET WITH SERVER

const { io } = createSocket(server);
useNamespace_chat(io);






