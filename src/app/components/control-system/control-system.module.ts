import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ControlSystemRoutingModule } from './control-system-routing.module';
import { ControlSystemComponent } from './control-system.component';
import { HrmBreadCrumbModule } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import { TakeControlDebtSupplierComponent } from './take-control-debt-supplier/take-control-debt-supplier.component';
import { TakeControlDebtCustomerComponent } from './take-control-debt-customer/take-control-debt-customer.component';
import { TakeControlLossProductComponent } from './take-control-loss-product/take-control-loss-product.component';
import { TakeControlLossCounterComponent } from './take-control-loss-counter/take-control-loss-counter.component';
import { TakeControlCostsComponent } from './take-control-costs/take-control-costs.component';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        DividerModule,
        SidebarModule,
        ButtonModule,
        ControlSystemRoutingModule,
        HrmBreadCrumbModule
    ],
    declarations: [ControlSystemComponent, TakeControlDebtSupplierComponent, TakeControlDebtCustomerComponent, TakeControlLossProductComponent, TakeControlLossCounterComponent, TakeControlCostsComponent]
})
export class ControlSystemModule { }
