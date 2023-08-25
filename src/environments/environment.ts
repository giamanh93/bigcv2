// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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


