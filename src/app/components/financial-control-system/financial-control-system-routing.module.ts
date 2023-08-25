import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerDebtComponent } from './customer-debt/customer-debt.component';
import { ReviewPaymentWithSupplierComponent } from './review-payment-with-supplier/review-payment-with-supplier.component';
import { ReviewRevenueWithFlowOfMoneyComponent } from './review-revenue-with-flow-of-money/review-revenue-with-flow-of-money.component';
import { ReviewSupplierDebtComponent } from './review-supplier-debt/review-supplier-debt.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReviewRevenueWithFlowOfMoneyComponent },
        { path: 'review-revenue-with-flow-of-money', component: ReviewRevenueWithFlowOfMoneyComponent },
        { path: 'review-payment-with-supplier', component: ReviewPaymentWithSupplierComponent },
        { path: 'review-supplier-debt', component: ReviewSupplierDebtComponent },
        { path: 'customer-debt', component: CustomerDebtComponent },
    ])],
    exports: [RouterModule]
})
export class FinancialControlSystemRoutingModule { }
