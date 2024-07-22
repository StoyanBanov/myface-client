import { io } from 'socket.io-client';
const HOST = import.meta.env.VITE_HOST

export default io(HOST)