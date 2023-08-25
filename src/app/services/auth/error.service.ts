import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

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
  }

  fetchError() {
    return  this._errorInfo;
  }
  private readonly _errorInfo = new BehaviorSubject<any>(null);

}
