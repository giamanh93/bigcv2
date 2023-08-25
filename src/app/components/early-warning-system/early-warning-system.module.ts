import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { EarlyWarningSystemRoutingModule } from './early-warning-system-routing.module';
import { EarlyWarningSystemComponent } from './early-warning-system.component';
import { HrmBreadCrumbModule } from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import {DividerModule} from 'primeng/divider';
import {TabViewModule} from 'primeng/tabview';
import { GroupWarningProductComponent } from './group-warning-product/group-warning-product.component';
import { GroupWarningCustomerComponent } from './group-warning-customer/group-warning-customer.component';
import { GroupWarningCounterComponent } from './group-warning-counter/group-warning-counter.component';
import { GroupWarningSupplierComponent } from './group-warning-supplier/group-warning-supplier.component';
import { EarlyWarningSystemService } from 'src/app/services/earlyWarningSystem.service';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { SkeletonModule } from 'primeng/skeleton';
import {PaginatorModule} from 'primeng/paginator';
import {ToolbarModule} from 'primeng/toolbar';
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import { SidebarModule } from 'primeng/sidebar';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        EarlyWarningSystemRoutingModule,
        HrmBreadCrumbModule,
        DividerModule,
        SidebarModule,
        TabViewModule,
        MessageModule,
        DropdownModule,
        LoadingGridModule,
        SkeletonModule,
        PaginatorModule,
        ToolbarModule,
        ListGridAngularModule,
    ],
    providers: [
        EarlyWarningSystemService,
    ],
    declarations: [EarlyWarningSystemComponent, GroupWarningProductComponent, GroupWarningCustomerComponent, GroupWarningCounterComponent, GroupWarningSupplierComponent]
})
export class EarlyWarningSystemModule { }
