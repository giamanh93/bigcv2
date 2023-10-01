import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Responses} from '../models/responses';
import {MessageService} from 'primeng/api';
import {ErrorService} from './error.service';
import {environment} from '../../environments/environment';

const baseUrl = environment.apiBase;

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  getListSync(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/sync/v1/getListSync?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  syncData(query: string): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/sync/v1/syncData` , query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }


  getListProduct(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/product/v1/getListProduct?` + query)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  getListProductToPromise(query: string) {
    return this.$http.get(baseUrl + `/product/v1/getListProduct?` + query).pipe(
      map((response: any) => response.data.content));
  }

  getListProductCategory(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/productCategory/v1/getListProductCategory?` + query)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  getListBranch(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/branch/v1/getListBranch?` + query)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  private $http = inject(HttpClient);
  private $messageService = inject(MessageService);
  private $errorService = inject(ErrorService);

  private handleError(error: any) {
    this.$errorService.setError(error.error);
    this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Hệ thông đang bảo trì.'});
  }


  private showError(err: any) {
    if (err) {
      if (err.error) {
        if (err.error.message) {
          //   this.talert.showError(err.error.message);
        } else {
          //   this.talert.showError(err.statusText || "Network Error!");
        }
      } else {
        // this.talert.showError(err.statusText || "Network Error!");
      }
    }
    // else this.talert.showError("Network Error!");
  }

}
