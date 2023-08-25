import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Responses} from '../models/responses';
import {MessageService} from 'primeng/api';
import {ErrorService} from './error.service';
import {environment} from '../../environments/environment';
import {AuthService} from './auth/auth.service';

const baseUrl = environment.apiBase;
const baseUrlUpload = environment.apiBaseUpload;

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  constructor(private  authService: AuthService) {
  }


  getMappingProduct(query: any): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/purchaseOrder/v1/getMappingProduct`, query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getListLastProductPriceBySupplierId(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/product/v1/getListLastProductPriceBySupplierId?` + query)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }


  savePurchaseOrder(query: any): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/purchaseOrder/v1/savePurchaseOrder`, query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  uploadFileOrder(query: any): Observable<Responses> {
    return this.$http.post<Responses>(baseUrlUpload + `/s3/v1/uploadFile`, query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  previewImage(query: any): Observable<Blob> {
    return this.$http.get(baseUrlUpload + `/s3/v1/preview?` +  query,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.getToken()}` ,
        }),
        responseType: 'blob'
      }).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getInfoFromImage(params: any): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/purchaseOrder/v1/getInfoFromImage`, params).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getMappingSupplier(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/purchaseOrder/v1/getMappingSupplier?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getBankAcount(query: string): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/purchaseOrder/v1/getBankAcount?` + query, {}).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getPurchaseOrderExpenseOther(query: string): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/purchaseOrder/v1/getPurchaseOrderExpenseOther?` + query, {}).pipe(
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

  getListUploadDate(query: string): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/purchaseOrder/v1/getListUploadDate?` + query, {})
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  getListImagePurchaseOrder(query: string): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/purchaseOrder/v1/getListImagePurchaseOrder?` + query, {})
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  getListImagePurchaseOrderDetail(query: any): Observable<Responses> {
    return this.$http.post<Responses>(baseUrl + `/purchaseOrder/v1/getListImagePurchaseOrderDetail` , query, )
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
    // this.$messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error });
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
