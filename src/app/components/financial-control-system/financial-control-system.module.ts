import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';
import {FinancialControlSystemRoutingModule} from './financial-control-system-routing.module';
import {FinancialControlSystemComponent} from './financial-control-system.component';
import {HrmBreadCrumbModule} from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import {ReviewRevenueWithFlowOfMoneyComponent} from './review-revenue-with-flow-of-money/review-revenue-with-flow-of-money.component';
import {DropdownModule} from 'primeng/dropdown';
import {LoadingGridModule} from 'src/app/common/components/loading-grid/loading-grid.module';
import {SkeletonModule} from 'primeng/skeleton';
import {PaginatorModule} from 'primeng/paginator';
import {ToolbarModule} from 'primeng/toolbar';
import {ListGridAngularModule} from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CalendarModule} from 'primeng/calendar';
import {financialControlSystemService} from 'src/app/services/financialControlSystem.service';
import {ReviewPaymentWithSupplierComponent} from './review-payment-with-supplier/review-payment-with-supplier.component';
import {DividerModule} from 'primeng/divider';
import {SidebarModule} from 'primeng/sidebar';
import {ReviewSupplierDebtComponent} from './review-supplier-debt/review-supplier-debt.component';
import {CustomerDebtComponent} from './customer-debt/customer-debt.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ReviewSupplierDebtByProductComponent} from './review-supplier-debt-by-product/review-supplier-debt-by-product.component';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    HrmBreadCrumbModule,
    SkeletonModule,
    DropdownModule,
    ToastModule,
    PaginatorModule,
    ToolbarModule,
    OverlayPanelModule,
    DividerModule,
    SidebarModule,
    CalendarModule,
    ListGridAngularModule,
    LoadingGridModule,
    FinancialControlSystemRoutingModule,
    AutoCompleteModule
  ],
  providers: [
    financialControlSystemService
  ],
  declarations: [FinancialControlSystemComponent, ReviewRevenueWithFlowOfMoneyComponent, ReviewPaymentWithSupplierComponent, ReviewSupplierDebtComponent, CustomerDebtComponent, ReviewSupplierDebtByProductComponent]
})
export class FinancialControlSystemModule {
}
