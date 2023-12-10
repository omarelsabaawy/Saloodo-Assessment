import socketIO from 'socket.io-client';

const WS = 'http://localhost:5000';
const ws = socketIO(WS);

export default ws;