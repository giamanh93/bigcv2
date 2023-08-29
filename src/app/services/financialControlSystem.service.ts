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
export class financialControlSystemService {

  getReviewRevenueWithFlowOfMoney(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewRevenueWithFlowOfMoney?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );

  }

  getReviewRevenueWithFlowOfMoneyDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewRevenueWithFlowOfMoneyDetail?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getReviewCustomerDebtDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewCustomerDebtDetail?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getReviewSupplierDebtDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewSupplierDebtDetail?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getReviewPaymentWithSupplier(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewPaymentWithSupplier?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getReviewSupplierDebtByProduct(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewSupplierDebtByProduct?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getReviewPaymentWithSupplierDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewPaymentWithSupplierDetail?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );

  }

  getReviewSupplierDebt(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewSupplierDebt?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );

  }

  getCustomerDebt(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getCustomerDebt?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );

  }

  getCustomerDebtDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getCustomerDebtDetail?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );

  }

  getReviewCustomerDebt(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/review/v1/getReviewCustomerDebt?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );

  }

  getListSupplier(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/supplier/v1/getListSupplier?` + query)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  getListSupplierToPromise(query: string) {
    return this.$http.get(baseUrl + `/supplier/v1/getListSupplier?` + query).pipe(
      map((response: any) => response.data.content));
  }

  getListCustomer(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getListCustomer?` + query)
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
    // this.$messageService.add({severity: 'error', summary: 'Error Message', detail: error.error});
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
