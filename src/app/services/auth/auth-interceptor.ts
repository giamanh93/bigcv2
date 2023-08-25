import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService, private router: Router,
    private spinner: NgxSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.auth.getToken();

     if (token) {
       if (request.url.includes('https://media.bigcv.vn')) {
         request = request.clone({
           setHeaders: {
              Authorization: `Bearer ${token}`,
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

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            this.auth.logout();
            location.reload();
            this.spinner.hide();
            } else if (err.status === 404 || err.status === 500 || err.status === 403) {
              this.spinner.hide();
            }
      }
      return throwError(err);
    })
     );
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
            this.auth.loginSuccess(response.data);
            this.refreshTokenSubject.next(response.data.access_token);
            return next.handle(this.addAuthenticationToken(response.data.access_token, request));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.auth.logout();
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

  private addAuthenticationToken(token: string | null, request: HttpRequest<any>): HttpRequest<any> {
    // request = request.clone({
    //   setHeaders: { 'Content-Type': 'application/json' }
    // });
    if (token != null && !request.url.includes('admin/v1/loginAdmin')) {
      const urls = request.url.split('?');
      if (urls && urls.length > 0 && urls[0].includes('media/api/upload/')) {
        request = request.clone(
          {
            headers: new HttpHeaders({
              'accept': '*/*',
            })
          }
        );
      } else {
        request = request.clone({
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          })
        });
      }

    }
    console.log(request);
    return request;
  }

  private handleServerSideError(error: HttpErrorResponse): boolean {
    let handled = false;
    console.log('Error', error.status);
    switch (error.status) {
      case 400:
        // this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: `Error: Bạn không có quyền sử dụng chức năng này` });
        this.spinner.hide();
        this.router.navigateByUrl('/login');
        handled = true;
        break;
      case 403:
        // this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: `Error: Bạn không có quyền sử dụng chức năng này` });
        this.spinner.hide();
        handled = true;
        break;
      case 500:
        // this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: `Error: Lỗi kết nối 500 !` });
        this.spinner.hide();
        handled = true;
        break;
      case 0:
        // this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: `Error: Lỗi kết nối service !` });
        this.spinner.hide();
        handled = true;
        break;
    }
    return handled;
  }
}
