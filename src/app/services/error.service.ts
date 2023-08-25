import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private readonly _errorInfo = new BehaviorSubject<any>(null);

  readonly errorInfo$ = this._errorInfo.asObservable();

  constructor() {
  }

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

  setError(value: any) {
    this.errorInfo = value
  }

  fetchError() {
    return  this._errorInfo
  }
  
}