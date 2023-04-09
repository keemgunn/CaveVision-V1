import { io } from './socket/ioServer.js';
import { useNamespace_chat } from './socket/namespaces/chat.js';
import { oscServer } from './osc/oscServer.js';

oscServer;

// USE SOCKET WITH SERVER
useNamespace_chat(io);