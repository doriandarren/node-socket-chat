import 'dotenv/config';
import { MyServer } from './models/server.js';

const server = new MyServer();


server.listen();