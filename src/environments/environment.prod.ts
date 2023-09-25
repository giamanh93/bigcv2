const host = {
  socketServer: 'wss://websocket.bigcv.vn/websocket',
  authServer: 'https://auth.bigcv.vn/auth/api',
  apiBigCv: 'https://report.bigcv.vn/api',
  apiUpload: 'https://media.bigcv.vn/api'
};


export const environment = {
  production: true,
  newLayout: false,
  apiBase: host.apiBigCv,
  socketServer: host.socketServer,
  apiBaseUpload: host.apiUpload,
  apiBaseAuth: host.authServer
};
