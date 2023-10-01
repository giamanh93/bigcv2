import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import {PanZoomAPI} from 'ngx-panzoom';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {financialControlSystemService} from '../../../../services/financialControlSystem.service';
import {ProductManagerService} from '../../../../services/productManager.serivce';
import {PurchaseOrderService} from '../../../../services/purcher-order.service';
import queryString from 'query-string';
import numeral from 'numeral';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-unit-change',
  templateUrl: './unit-change.component.html',
  styleUrls: ['./unit-change.component.scss']
})
export class UnitChangeComponent implements OnInit {
  @Input() visibleChangeUnit: boolean = false;
  @Input() branchId: number = 0;
  @Output() close = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Input() dataProductItem: any = null;
  infoProduct: any = null;
  products: any[] = [];
  modelUnitChange: any = {
    exchangeProductId: null,
    exchangeProductName: null,
    exchangeUnit: null,
    exchangeQuantity: 0,
    exchangePrice: 0,
    exchangeAmount: 0,
    isExchange: true
  };

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.dataProductItem && this.dataProductItem.exChange && this.dataProductItem.exChange.exchangeProductId) {
      this.modelUnitChange = this.dataProductItem.exChange;
    } else {
      this.modelUnitChange.exchangePrice = numeral(this.dataProductItem.price).value();
    }
  }

  onClear() {
    this.modelUnitChange.exchangeProductId = null;
    this.modelUnitChange.exchangeUnit = null;
    this.modelUnitChange.exchangeQuantity = 0;
    this.modelUnitChange.exchangePrice = 0;
    this.modelUnitChange.exchangeAmount = 0;
    this.close.emit();
  }

  onChageUnitQuantityChange() {
    if (this.modelUnitChange.exchangeQuantity > 0) {
      const price: any = this.dataProductItem.price ? numeral(this.dataProductItem.price).value() : 0;
      this.modelUnitChange.exchangePrice = price / this.modelUnitChange.exchangeQuantity;
      this.modelUnitChange.exchangeAmount = this.modelUnitChange.exchangePrice * this.modelUnitChange.exchangeQuantity;
    }
  }

  onChageUnitChange() {
    this.modelUnitChange.exchangeAmount = this.modelUnitChange.exchangePrice * this.modelUnitChange.exchangeQuantity;
  }

  saveUnitChange() {
    const params = {
      isExchange: 1,
      exchangeProductId: this.modelUnitChange.exchangeProductId,
      exchangeProductName: this.modelUnitChange.exchangeProductId.productName,
      exchangePrice: this.modelUnitChange.exchangePrice,
      exchangeUnit: this.modelUnitChange.exchangeUnit,
      exchangeQuantity: this.modelUnitChange.exchangeQuantity,
      exchangeAmount: this.modelUnitChange.exchangeAmount
    };
    this.save.emit(params);
  }

  delete() {
    this.save.emit(null);
  }

  changeProduct() {
    this.modelUnitChange.exchangeUnit = this.modelUnitChange.exchangeProductId.unit;
  }

  getListproduct(filter: string) {
    const queryParams = queryString.stringify({retailerId: this.authService?.getRetailerId(), branchId: this.branchId, search: filter});
    this.$serviceProduct.getListProduct(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          const products = results.data.content ?? [];
          this.products = [...products];
        } else {
          this.products = [];
          this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Hệ thông đang bảo trì.'});
        }
      });
  }


  private $datepipe = inject(DatePipe);
  private $spinner = inject(NgxSpinnerService);
  private $serviceProduct = inject(ProductManagerService);
  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(PurchaseOrderService);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);
}
