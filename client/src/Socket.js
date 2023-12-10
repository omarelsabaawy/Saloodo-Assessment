import socketIO from 'socket.io-client';

const WS = 'http://localhost:8080';
const ws = socketIO(WS);

export default ws;