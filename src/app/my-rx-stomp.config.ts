import {RxStompConfig} from '@stomp/rx-stomp';
import {parseJwt} from './services/auth/utilities';
import {AUTH_CONSTANT} from './services/auth/models/constant';
const tokenData = parseJwt(localStorage.getItem(AUTH_CONSTANT.TOKENBIGCV));
export const myRxStompConfig: RxStompConfig = {
  // Which server?
  brokerURL: 'wss://websocket.bigcv.vn/websocket',

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {'username': `${tokenData.user_name}`},

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  // heartbeatIncoming: 0, // Typical value 0 - disabled
  // heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  // reconnectDelay: 200,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(msg);
  },
};
