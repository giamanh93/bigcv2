import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AUTH_CONSTANT} from './models/constant';
import {parseJwt} from './utilities';
import {Login} from './models/login.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  baseUrl = environment.apiBaseAuth;

  constructor(
    private http: HttpClient) {
  }

  login(params: Login): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': '*/*'
      })
    };
    return this.http.post(this.baseUrl + '/user/v1/login', params, options);
  }


  refreshToken(refreshToken: string): Observable<any> {
    // const urlencoded = new URLSearchParams();
    // urlencoded.append('client_id', 'swagger_development');
    // urlencoded.append('grant_type', 'refresh_token');
    // urlencoded.append('scope', 'openid');
    // urlencoded.append('refresh_token', refreshToken);
    const options = {
      headers: new HttpHeaders({
        'accept': '*/*'
      })
    };
    return this.http.post(`${this.baseUrl}/user/v1/refresh?refreshToken=${refreshToken}`, {}, options);
  }

  loginSuccess(data: any): void {
    // localStorage.setItem(AUTH_CONSTANT.ID_TOKEN, data.id_token || '');
    localStorage.setItem(AUTH_CONSTANT.EXPIRES_IN, `${data.expires_in}` || '');
    localStorage.setItem(AUTH_CONSTANT.REFRESH_TOKEN, data.refresh_token || '');
    localStorage.setItem(AUTH_CONSTANT.REFRESH_TOKEN_BY_IN, data.refresh_expires_in || '');
    localStorage.setItem(AUTH_CONSTANT.SCOPE, data.scope || '');
    // localStorage.setItem(AUTH_CONSTANT.SESSION_STATE, data.session_state || '');
    localStorage.setItem(AUTH_CONSTANT.TOKEN, data.access_token || '');
    localStorage.setItem(AUTH_CONSTANT.TOKENBIGCV, data.access_token || '');
  }

  logout(): void {
    localStorage.removeItem(AUTH_CONSTANT.ID_TOKEN);
    localStorage.removeItem(AUTH_CONSTANT.EXPIRES_IN);
    localStorage.removeItem(AUTH_CONSTANT.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_CONSTANT.REFRESH_TOKEN_BY_IN);
    localStorage.removeItem(AUTH_CONSTANT.SCOPE);
    localStorage.removeItem(AUTH_CONSTANT.SESSION_STATE);
    localStorage.removeItem(AUTH_CONSTANT.TOKEN);
    localStorage.removeItem(AUTH_CONSTANT.TOKENBIGCV);

  }

  expireToken(): boolean {
    const token = localStorage.getItem(AUTH_CONSTANT.TOKENBIGCV);
    if (token) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
    }
    return true;
  }

  getToken(): string {
    return localStorage.getItem(AUTH_CONSTANT.TOKENBIGCV) || '';
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(AUTH_CONSTANT.REFRESH_TOKEN);
  }

  getExpireIn(): string | null {
    return localStorage.getItem(AUTH_CONSTANT.EXPIRES_IN);
  }

  getIdToken(): string | null {
    return localStorage.getItem(AUTH_CONSTANT.ID_TOKEN);
  }

  getSessionState(): string | null {
    return localStorage.getItem(AUTH_CONSTANT.SESSION_STATE);
  }

  getUserName(): string {
    const tokenData = parseJwt(localStorage.getItem(AUTH_CONSTANT.TOKENBIGCV));
    return tokenData.user_name || 'User Name';
  }

  getRetailerId(): number {
    const tokenData = parseJwt(localStorage.getItem(AUTH_CONSTANT.TOKENBIGCV));
    return tokenData.ex_retailer_id;
  }

  getRetailerName(): string {
    const tokenData = parseJwt(localStorage.getItem(AUTH_CONSTANT.TOKENBIGCV));
    return tokenData.realm_id;
  }
}
