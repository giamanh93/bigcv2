import { TakeControlLossCounterComponent } from './take-control-loss-counter/take-control-loss-counter.component';
import { TakeControlLossProductComponent } from './take-control-loss-product/take-control-loss-product.component';
import { TakeControlDebtCustomerComponent } from './take-control-debt-customer/take-control-debt-customer.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TakeControlDebtSupplierComponent } from './take-control-debt-supplier/take-control-debt-supplier.component';
// { label: '1. Kiểm soát công nợ nhà cung cấp', routerLink: '/control-system/take-control-debt-supplier' },
// { label: '2. Kiểm soát công nợ khách hàng', routerLink: '/control-system/take-control-debt-customer' },
// { label: '3. Kiểm soát thất thoát hàng hóa', routerLink: '/control-system/take-control-loss-product' },
// { label: '4. Kiểm soát thất thoát thu ngân', routerLink: '/control-system/take-control-loss-counter' },
// { label: '5. Kiểm soát chi phí', routerLink: '/control-system/take-control-costs' },
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TakeControlDebtSupplierComponent },
        { path: 'take-control-debt-supplier', component: TakeControlDebtSupplierComponent },
        { path: 'take-control-debt-customer', component: TakeControlDebtCustomerComponent },
        { path: 'take-control-loss-product', component: TakeControlLossProductComponent },
        { path: 'take-control-loss-counter', component: TakeControlLossCounterComponent },
    ])],
    exports: [RouterModule]
})
export class ControlSystemRoutingModule { }
