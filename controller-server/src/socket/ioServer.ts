import https from 'https';
import fs from 'fs';
import configs from '../configs/configs.js';
import { expressApp } from './express.js';
import { internalIP } from '../helpers/ipAddress.js';
import { getFileURL } from '../helpers/fileSystem.js';
import { Server } from "socket.io";
import { corsOptions } from "../helpers/cors.js";


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
  console.log('======== SOCKET.IO SERVER RUNNING') 
  console.log(` - https://localhost:${PORT_BACKEND}`);
  console.log(` - https://${internalIP}:${PORT_BACKEND}\n\n`);
});


// CREATE SOCKET.IO SERVER
export const io = new Server(server, {
  cors: corsOptions
})