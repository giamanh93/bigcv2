import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProductManagerService} from '../../../../services/productManager.serivce';
import {PurchaseOrderService} from '../../../../services/purcher-order.service';
import queryString from 'query-string';
import {Ship} from '../../../../models/account';
import numeral from 'numeral';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-order-ship',
  templateUrl: './order-ship.component.html',
  styleUrls: ['./order-ship.component.scss']
})
export class OrderShipComponent implements OnInit {
  @Input() visibleNCC: boolean = false;
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
  listShips: Ship[] = [];
  selectedShips: Ship[] = [];
  stateOptions: any[] = [
    {label: 'VND', value: 1},
    {label: '%', value: 2}
  ];

  modelShip: any = {
    amount: 0,
    type: 1,
    ratio: 0
  };
  constructor(private authService: AuthService) {
  }

  onChageActionShip() {
    this.modelShip.amount = 0;
    this.modelShip.ratio = 0;
  }

  ngOnInit() {
    this.getPurchaseOrderExpenseOther();
  }

  getPurchaseOrderExpenseOther() {
    const queryParams = queryString.stringify({retailerId: this.authService?.getRetailerId()});
    this.$service.getPurchaseOrderExpenseOther(queryParams)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(results => {
        if (results.success) {
          this.listShips = results.data.content ?? [];
          if (this.model.ship.length > 0) {
            this.selectedShips = this.model.ship;
            this.modelShip = {
              amount: this.model.ship[0].amount,
              type: this.model.ship[0].type,
              ratio: this.model.ship[0].ratio
            };

          } else {
            if (this.listShips.length > 0) {
              this.selectedShips = this.listShips.filter((item, index) => index === 0);
            }
          }
        } else {
          this.$messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Hệ thông đang bảo trì.'});
        }
      });
  }

  onChageShip() {

  }

  onClear() {
    this.close.emit();
  }

  delete() {
    this.save.emit([]);
  }

  onSave() {
    this.selectedShips = this.selectedShips.map(item => {
      let amount = this.modelShip.amount;
      let ratio = this.modelShip.ratio;
      if (this.modelShip.type === 2) {
        amount = numeral(this.model.haveToPayedAmount * this.modelShip.ratio / 100.00).format('0,0');
        amount = numeral(amount).value();
      } else {
        ratio = 0;
      }
      return {
        ...item, amount: amount, ratio: ratio, type: this.modelShip.type
      };
    });
    this.save.emit(this.selectedShips);
  }


  private $datepipe = inject(DatePipe);
  private $spinner = inject(NgxSpinnerService);
  private $serviceProduct = inject(ProductManagerService);
  private readonly unsubscribe$: Subject<void> = new Subject();
  private $service = inject(PurchaseOrderService);
  private $messageService = inject(MessageService);
  private $changeDetech = inject(ChangeDetectorRef);
}

