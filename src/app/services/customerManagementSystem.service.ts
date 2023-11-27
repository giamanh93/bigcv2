import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Responses} from '../models/responses';
import {MessageService} from 'primeng/api';
import {ErrorService} from './error.service';
import {environment} from 'src/environments/environment';

const baseUrl = environment.apiBase;

@Injectable({
  providedIn: 'root'
})
export class customerManagementSystem {

  getRevenueByCustomer(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getRevenueByCustomer?` + query).pipe(
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

  getRevenueByCustomerDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getRevenueByCustomerDetail?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getCustomerRevenueByAreaDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getCustomerRevenueByAreaDetail?` + query).pipe(
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

  getCustomerRevenueByInvoiceCostDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getCustomerRevenueByInvoiceCostDetail?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );

  }

  getCustomerRevenueInPeriodDetail(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getCustomerRevenueInPeriodDetail?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );

  }

  getCustomerRevenueInPeriod(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getCustomerRevenueInPeriod?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getCustomerRevenueByArea(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getCustomerRevenueByArea?` + query).pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getCustomerRevenueByInvoiceCost(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/customer/v1/getCustomerRevenueByInvoiceCost?` + query);
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

  getDebtCustomerReports(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/alert/v1/getDebtCustomerReports?` + query)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  getProfitMarginReports(query: string): Observable<Responses> {
  return this.$http.get<Responses>(baseUrl + `/alert/v1/getProfitMarginReports?` + query)
    .pipe(
      catchError(error => {
        this.handleError(error);
        return of(error.error);
      })
    );
  }

  getUnprofitableReports(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/alert/v1/getUnprofitableReports?` + query)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  damageRateExceedsNorm(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/alert/v1/damageRateExceedsNorm?` + query)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of(error.error);
        })
      );
  }

  getDecreaseRevenueByCustomer(query: string): Observable<Responses> {
    return this.$http.get<Responses>(baseUrl + `/alert/v1/getDecreaseRevenueByCustomer?` + query)
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
