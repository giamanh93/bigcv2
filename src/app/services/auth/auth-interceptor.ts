import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService, private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    request = this.addAuthenticationToken(token, request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          this.handleServerSideError(error);
          return throwError(error);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = this.auth.getRefreshToken();
      if (refreshToken) {
        return this.auth.refreshToken(refreshToken).pipe(
          switchMap((response: any) => {
            this.isRefreshing = false;
            this.auth.loginSuccess(response);
            this.refreshTokenSubject.next(response.access_token);
            return next.handle(this.addAuthenticationToken(response.access_token, request));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.auth.logout();
            this.router.navigateByUrl('/login');
            return throwError(err);
          })
        );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addAuthenticationToken(token, request)))
    );
  }

  private addAuthenticationToken(token, request: HttpRequest<any>): HttpRequest<any> {
    if (token) {
      if (request.url.includes('https://media.bigcv.vn')) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'accept': '*/*',
            // 'Content-Type': 'multipart/form-data'
          }
        });
      } else if (request.url.includes('https://auth.bigcv.vn')) {
        request = request.clone({
          setHeaders: {
            // Authorization: `Bearer ${token}`,
            'accept': '*/*',
            // 'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        });
      }
    }

    return request;
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled = false;
    console.log('Error', error.status);
    switch (error.status) {
      case 400:
        // this.messageService.add({severity: 'error', summary: 'Thông báo', detail: `Error: Bạn không có quyền sử dụng chức năng này`});
        this.spinner.hide();
        this.router.navigateByUrl('/login');
        handled = true;
        break;
      case 401:
        // this.messageService.add({severity: 'error', summary: 'Thông báo', detail: `Error: Bạn không có quyền sử dụng chức năng này`});
        this.spinner.hide();
        this.router.navigateByUrl('/login');
        handled = true;
        break;
      case 403:
        // this.messageService.add({severity: 'error', summary: 'Thông báo', detail: `Error: Bạn không có quyền sử dụng chức năng này`});
        this.spinner.hide();
        handled = true;
        break;
      case 500:
        // this.messageService.add({severity: 'error', summary: 'Thông báo', detail: `Error: Lỗi kết nối 500 !`});
        this.spinner.hide();
        handled = true;
        break;
      case 0:
        // this.messageService.add({severity: 'error', summary: 'Thông báo', detail: `Error: Lỗi kết nối service !`});
        this.spinner.hide();
        handled = true;
        break;
    }
    return handled;
  }
}
