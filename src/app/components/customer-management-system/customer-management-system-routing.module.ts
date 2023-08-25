import { FollowUpCustomerSalesAreaComponent } from './follow-up-customer-sales-area/follow-up-customer-sales-area.component';
import { FollowFormShoppingComponent } from './follow-form-shopping/follow-form-shopping.component';
import { FollowOrderValueComponent } from './follow-order-value/follow-order-value.component';
import { FollowUpCustomerCycleComponent } from './follow-up-customer-cycle/follow-up-customer-cycle.component';
import { FollowUpCustomerSalesProductComponent } from './follow-up-customer-sales-product/follow-up-customer-sales-product.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerManagementSystemComponent } from './customer-management-system.component';
import { FollowDebtCustomerComponent } from './follow-debt-customer/follow-debt-customer.component';
// { label: '1. Theo dõi doanh số khách hàng theo sản phẩm', routerLink: '/customer-mgmt-system/follow-up-customer-sales-product' },
// { label: '2. Theo dõi doanh số khách hàng theo chu kỳ', routerLink: '/customer-mgmt-system/follow-up-customer-cycle' },
// { label: '3. Theo dõi theo giá trị đơn hàng', routerLink: '/customer-mgmt-system/follow-order-value' },
// { label: '4. Theo dõi theo hình thức mua hàng', routerLink: '/customer-mgmt-system/follow-form-shopping' },
// { label: '5. Theo dõi doanh số khách hàng theo khu vực', routerLink: '/customer-mgmt-system/follow-up-customer-sales-area' },
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FollowUpCustomerSalesProductComponent },
        { path: 'follow-up-customer-sales-product', component: FollowUpCustomerSalesProductComponent },
        { path: 'follow-up-customer-cycle', component: FollowUpCustomerCycleComponent },
        { path: 'follow-order-value', component: FollowOrderValueComponent },
        { path: 'follow-form-shopping', component: FollowFormShoppingComponent },
        { path: 'follow-up-customer-sales-area', component: FollowUpCustomerSalesAreaComponent },
        { path: 'follow-debt-customer', component: FollowDebtCustomerComponent },
    ])],
    exports: [RouterModule]
})
export class CustomerManagementSystemRoutingModule { }
