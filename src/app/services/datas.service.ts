import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class DatasService {
  private readonly _Datas = new BehaviorSubject<any[]>([]);

  readonly Datas$ = this._Datas.asObservable();

  constructor() {
  }

  set Datas(val: any[]) {
    if (val) {
      this._Datas.next(val);
    } else {
      this._Datas.next([]);
    }
  }

  get Datas(): any[] {
    return this._Datas.getValue();
  }

  setStocks(value: any[]) {
    this.Datas = value
  }

  fetchAll() {
    return of(this._Datas.getValue())
  }
  
}