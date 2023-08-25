import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductManagerService} from '../../../../services/productManager.serivce';
import {PurchaseOrderService} from '../../../../services/purcher-order.service';
import queryString from 'query-string';
import {Account, Ship} from '../../../../models/account';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
  @Input() visiblePayment: boolean = false;
  @Input() branchId: number = 0;
  @Output() close = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Input() dataProductItem: any = null;
  @Input() model: any = null;
  infoProduct: any = null;
  products: any[] = [];
  modelUnitChange: any = {
    productId: null,
    unitName: null,
    quantity: 0
  };
  accounts: Account[] = [];
  selectedShips: Ship[] = [];
  modelpayment: any = {
    accountId: null,
    amount: null,
    method: 'Transfer',
    debtAmount: 0
  };

  isErrorAmount: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getBankAcount();

  }

  getBankAcount() {
    const queryParams = queryString.stringify({retailerId: this.authService?.getRetailerId()});
    this.$service.getBankAcount(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.accounts = results.data.content ?? [];
          this.accounts = this.accounts.map(item => {
            return {...item, accountName: item.accountId + ' - ' + item.bank};
          });
          if (this.model.paying.length > 0) {
            this.modelpayment.method = this.model.paying[0].method;
            this.modelpayment.accountId = this.model.paying[0].accountId;
            this.modelpayment.amount = this.model.paying[0].amount;
            this.modelpayment.debtAmount = this.model.debtAmount;
          } else {
            this.modelpayment.debtAmount = this.model.debtAmount;
            this.modelpayment.amount = 0;
          }
        } else {
          this.$messageService.add({severity: 'error', summary: 'Error Message', detail: results.code});
        }
      });
  }

  onClear() {
    this.close.emit();
  }

  onSave() {
    if (!this.modelpayment.accountId && (this.modelpayment.method === 'Card' || this.modelpayment.method === 'Transfer')) {
      this.$messageService.add({
        severity: 'warn'
        , summary: 'Warning Message'
        , detail: 'Bạn chưa chọn phương thức thanh toán . !'
      });
      return;
    }
    if (this.isErrorAmount) {
      this.$messageService.add({
        severity: 'warn'
        , summary: 'Warning Message'
        , detail: 'Số tiền thanh toán không được lớn hơn số tiền phải thanh toán. !'
      });
      this.isErrorAmount = true;
      return;
    }
    this.isErrorAmount = false;
    let accountId = 0;
    let bank = null;
    if (this.modelpayment.method === 'Cash') {
      accountId = 0;
      bank = null;
    } else {
      const accountss: any[] = this.accounts.filter(item => item.accountId === this.modelpayment.accountId);
      accountId = this.modelpayment.accountId;
      bank = accountss[0].bank;
    }
    this.model.paidAmount = this.modelpayment.amount;
    const payment = [{
      accountId: accountId,
      bank: bank,
      amount: this.modelpayment.amount,
      method: this.modelpayment.method,
    }];
    this.model.debtAmount = this.modelpayment.debtAmount;
    this.model.paying = payment;
    const params = {
      model: this.model,
    };

    this.save.emit(params);
  }

  onClickTypePayment() {
    if (this.modelpayment.debtAmount === this.model.haveToPayedAmount) {
      this.modelpayment.amount = this.modelpayment.debtAmount;
      this.modelpayment.debtAmount = 0;
    }
    // const debtAmount = this.modelpayment.debtAmount;
    // const amount = this.modelpayment.debtAmount;
    // const debtAmountCheck = this.model.haveToPayedAmount - amount;
    //
    // if (debtAmountCheck < 0) {
    //   this.$messageService.add({
    //     severity: 'warn'
    //     , summary: 'Warning Message'
    //     , detail: 'Số tiền thanh toán không được lớn hơn số tiền phải thanh toán. !'
    //   });
    //   this.isErrorAmount = true;
    //   return;
    // }
    // this.isErrorAmount = false;
    // this.modelpayment.amount = this.modelpayment.debtAmount;
    // this.modelpayment.debtAmount = this.model.haveToPayedAmount - this.modelpayment.amount;
  }

  onChageAmount() {
    // if (this.modelpayment.debtAmount > this.model.haveToPayedAmount) {
    //   this.$messageService.add({
    //     severity: 'warn'
    //     , summary: 'Warning Message'
    //     , detail: 'Số tiền thanh toán không được lớn hơn số tiền phải thanh toán. !'
    //   });
    //   this.isErrorAmount = true;
    //   return;
    // }
    const debtAmount = this.modelpayment.debtAmount;
    const amount = this.modelpayment.debtAmount;
    const debtAmountCheck = this.model.haveToPayedAmount - amount;

    if (debtAmountCheck < 0) {
      this.$messageService.add({
        severity: 'warn'
        , summary: 'Warning Message'
        , detail: 'Số tiền thanh toán không được lớn hơn số tiền phải thanh toán. !'
      });
      this.isErrorAmount = true;
      return;
    }
    this.isErrorAmount = false;
    this.modelpayment.amount = this.modelpayment.debtAmount;
    this.modelpayment.debtAmount = this.model.haveToPayedAmount - this.modelpayment.amount;

  }

  delete() {
    this.model.paying = [];
    this.model.debtAmount = this.model.haveToPayedAmount;
    this.modelpayment.debtAmount = this.model.debtAmount;
    this.modelpayment.amount = 0;
    this.model.paidAmount = 0;
    const params = {
      model: this.model,
    };

    this.save.emit(params);
  }


  private $datepipe = inject(DatePipe);
  private $spinner = inject(NgxSpinnerService);
  private $serviceProduct = inject(ProductManagerService);
  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(PurchaseOrderService);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);
}


