import * as operationsRooms from './rooms/index.js';
import * as operationsWebSocket from './rooms/index.js';

export default {
  ...operationsRooms,
  ...operationsWebSocket,
};
