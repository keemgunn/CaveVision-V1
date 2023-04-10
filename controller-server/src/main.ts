import { io } from './socket/ioServer.js';
import { useNamespace_chat } from './socket/namespaces/chat.js';
import { oscServer } from './osc/oscServer.js';
import serialPortController from './arduino/serialPort.js';

oscServer;

serialPortController.test_drive();

// USE SOCKET WITH SERVER
useNamespace_chat(io);