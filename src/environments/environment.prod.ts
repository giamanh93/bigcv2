const host = {
  authServer: 'https://auth.bigcv.vn/auth/api',
  apiBigCv: 'https://report.bigcv.vn/api',
  apiUpload: 'https://media.bigcv.vn/api'
};


export const environment = {
  production: true,
  newLayout: false,
  apiBase: host.apiBigCv,
  apiBaseUpload: host.apiUpload,
  apiBaseAuth: host.authServer
};
