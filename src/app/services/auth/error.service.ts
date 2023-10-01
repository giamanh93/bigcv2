import {inject, Injectable} from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import {PurchaseOrderService} from '../purcher-order.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({ providedIn: 'root' })
export class ErrorService {

  set errorInfo(val: any) {
    if (val) {
      this._errorInfo.next(val);
    } else {
      this._errorInfo.next(null);
    }
  }

  get errorInfo(): any {
    return this._errorInfo.getValue();
  }

  readonly errorInfo$ = this._errorInfo.asObservable();

  constructor() {
  }

  setError(value: any) {
    this.errorInfo = value;
    this.$spinner.hide();
  }

  fetchError() {
    return  this._errorInfo;
  }
  private readonly _errorInfo = new BehaviorSubject<any>(null);
  private $spinner = inject(NgxSpinnerService);
}
