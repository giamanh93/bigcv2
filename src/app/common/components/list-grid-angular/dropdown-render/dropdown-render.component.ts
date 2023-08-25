import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-dropdown-render',
  template: `
    <!--    <p-dropdown [options]="params.data.product" [(ngModel)]="params.data.productId" (onChange)="onClickChange($event)"-->
    <!--     [autoDisplayFirst]="false" optionLabel="productName" optionValue="productId"-->
    <!--      [appendTo]="'body'" [filter]="true"-->
    <!--       filterBy="productName">-->
    <!--       <ng-template pTemplate="filter" >-->
    <!--                        <input type="text" style="width: 100%;" [(ngModel)]="productFilter" (ngModelChange)="this.productFilterUpdate.next($event)" placeholder="Tìm kiêm sản phẩm">-->
    <!--                    </ng-template>-->
    <!--      </p-dropdown>-->
    <!--    <p-autoComplete-->
    <!--      [(ngModel)]="params.data.productId"-->
    <!--      [virtualScroll]="true"-->
    <!--      field="productName"-->
    <!--      [appendTo]="'body'"-->
    <!--      [suggestions]="params.data.product"-->
    <!--      [virtualScrollItemSize]="34"-->
    <!--      (completeMethod)="filterProducts($event)"></p-autoComplete>-->
    <div *ngIf="params.node.rowPinned !== 'bottom'">
      <p-autoComplete
        field="productName"
        placeholder="Tìm kiếm sản phẩm"
        [dropdownAriaLabel]="'sadasd'"
        [(ngModel)]="params.data.productId"
        id="FullName"
        (onClear)="onClear($event)"
        [suggestions]="params.data.product"
        [lazy]="true"
        (onSelect)="onClickChange($event)"
        [showEmptyMessage]="true"
        [emptyMessage]="'Không tìm thấy dữ liệu search'"
        [appendTo]="'body'"
        [style]="{'width':'100%'}"
        [inputStyle]="{'width':'100%'}"
        [panelStyle]="{'width':'100%'}"
        (completeMethod)="filterProducts($event)"
      ></p-autoComplete>
      <p-button icon="pi pi-sort-alt-slash"
                styleClass="button-unit p-button-secondary {{params.data.exChange ? 'active' : ''}}" (onClick)="onClick($event)"
                [style]="{'position': 'absolute', 'right': 0, 'width': '20px', 'height': '20px', 'font-size': '12px !important'}">
      </p-button>
    </div>
  `
})
export class DropdownRenderComponent implements ICellRendererAngularComp {
  params: any;
  label: string = '';
  products: any[] = [];
  productFilter: string = '';
  productFilterUpdate = new Subject<string>();

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label || null;
    this.products = this.params.data.product;
    // this.productFilterUpdate.pipe(
    //   debounceTime(800),
    //   distinctUntilChanged())
    //   .subscribe(value => {
    //     this.onFilterProduct(value);
    //   });
  }

  onClear($event: any) {
    const item = this.params.node.data;
    item.productId = null;
    item.unitName = '';
    const params = {
      event: $event,
      rowData: item,
      index: this.params.rowIndex,
      params: this.params
      // ...something
    };
    this.params.onClick(params);
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params.onDropdownClick instanceof Function) {
      this.params.data.product = [];
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        index: this.params.rowIndex,

        // ...something
      };
      this.params.onDropdownClick(params);
    }
  }

  onClickChange($event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const paramss = {
        event: $event,
        rowData: this.params.node.data,
        index: this.params.rowIndex,
        params: this.params
        // ...something
      };
      this.params.onClick(paramss);
    }
  }

  filterProducts(event: any) {
    const paramss = {
      event: event.query,
      rowData: this.params.node.data,
      index: this.params.rowIndex,
      params: this.params
    };
    this.params.onFilter(paramss);
  }

  onFilterProduct(value: string) {
    const paramss = {
      event: value,
      rowData: this.params.node.data,
      index: this.params.rowIndex,
      params: this.params
      // ...something
    };
    this.params.onFilter(paramss);
  }
}
