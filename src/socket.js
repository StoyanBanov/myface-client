import { io } from 'socket.io-client';
import { HOST } from './constants';

export default io(HOST)