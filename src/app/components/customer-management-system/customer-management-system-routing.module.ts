import { FollowUpCustomerSalesAreaComponent } from './follow-up-customer-sales-area/follow-up-customer-sales-area.component';
import { FollowFormShoppingComponent } from './follow-form-shopping/follow-form-shopping.component';
import { FollowOrderValueComponent } from './follow-order-value/follow-order-value.component';
import { FollowUpCustomerCycleComponent } from './follow-up-customer-cycle/follow-up-customer-cycle.component';
import { FollowUpCustomerSalesProductComponent } from './follow-up-customer-sales-product/follow-up-customer-sales-product.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerManagementSystemComponent } from './customer-management-system.component';
import { FollowDebtCustomerComponent } from './follow-debt-customer/follow-debt-customer.component';
import {DebtCustomerReportsComponent} from './debt-customer-reports/debt-customer-reports.component';
import {ProfitMarginReportComponent} from './profit-margin-report/profit-margin-report.component';
import {UnProfitTableReportComponent} from './un-profit-table-report/un-profit-table-report.component';
import {DamageRateExceedsNormComponent} from './damage-rate-exceeds-norm/damage-rate-exceeds-norm.component';
import {DecreaseRevenueByCustomerComponent} from './decrease-revenue-by-customer/decrease-revenue-by-customer.component';
// { label: '1. Theo dõi doanh số khách hàng theo sản phẩm', routerLink: '/customer-mgmt-system/follow-up-customer-sales-product' },
// { label: '2. Theo dõi doanh số khách hàng theo chu kỳ', routerLink: '/customer-mgmt-system/follow-up-customer-cycle' },
// { label: '3. Theo dõi theo giá trị đơn hàng', routerLink: '/customer-mgmt-system/follow-order-value' },
// { label: '4. Theo dõi theo hình thức mua hàng', routerLink: '/customer-mgmt-system/follow-form-shopping' },
// { label: '5. Theo dõi doanh số khách hàng theo khu vực', routerLink: '/customer-mgmt-system/follow-up-customer-sales-area' },
@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FollowUpCustomerCycleComponent },
        {
          path: 'follow-up-customer-cycle',
          component: FollowUpCustomerCycleComponent,
          data: {
            title: 'Chu kỳ khách hàng'
          }
        },
        {
          path: 'follow-order-value',
          component: FollowOrderValueComponent,
          data: {
            title: 'Chu kỳ doanh thu'
          }
        },
        {
          path: 'follow-up-customer-sales-product',
          component: FollowUpCustomerSalesProductComponent,
          data: {
            title: 'Chu kỳ sản phẩm'
          }
        },
        {
          path: 'debt-customer-report',
          component: DebtCustomerReportsComponent,
          data: {
            title: 'Công nợ vượt định mức'
          }
        },
        {
          path: 'profit-margin-report',
          component: ProfitMarginReportComponent,
          data: {
            title: 'Không đạt biên độ lợi nhuận'
          }
        },
        {
          path: 'un-profit-table-report',
          component: UnProfitTableReportComponent,
          data: {
            title: 'Không có lãi'
          }
        },
        {
          path: 'damage-rate-exceeds-norm',
          component: DamageRateExceedsNormComponent,
          data: {
            title: 'Hỏng, hủy'
          }
        },
        {
          path: 'decrease-revenue-by-customer',
          component: DecreaseRevenueByCustomerComponent,
          data: {
            title: 'Giảm theo chu kỳ'
          }
        },
        { path: 'follow-form-shopping', component: FollowFormShoppingComponent },
        { path: 'follow-up-customer-sales-area', component: FollowUpCustomerSalesAreaComponent },
        { path: 'follow-debt-customer', component: FollowDebtCustomerComponent },
    ])],
    exports: [RouterModule]
})
export class CustomerManagementSystemRoutingModule { }
