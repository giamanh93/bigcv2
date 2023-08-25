import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GroupWarningCounterComponent } from './group-warning-counter/group-warning-counter.component';
import { GroupWarningCustomerComponent } from './group-warning-customer/group-warning-customer.component';
import { GroupWarningProductComponent } from './group-warning-product/group-warning-product.component';
import { GroupWarningSupplierComponent } from './group-warning-supplier/group-warning-supplier.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: GroupWarningProductComponent },
        { path: 'group-warning-product', component: GroupWarningProductComponent },
        { path: 'group-warning-customer', component: GroupWarningCustomerComponent },
        { path: 'group-warning-counter', component: GroupWarningCounterComponent },
        { path: 'group-warning-supplier', component: GroupWarningSupplierComponent },
    ])],
    exports: [RouterModule]
})
export class EarlyWarningSystemRoutingModule { }
