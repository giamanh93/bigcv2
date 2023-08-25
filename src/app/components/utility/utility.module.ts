import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityRoutingModule } from './utility-routing.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { HrmBreadCrumbModule } from 'src/app/common/hrm-breadcrumb/hrm-breadcrumb.module';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommingUpCustomerComponent } from './comming-up-customer/comming-up-customer.component';
import { UtilityManagerService } from 'src/app/services/utility.manager.server';


@NgModule({
  declarations: [
    CommingUpCustomerComponent
  ],
  imports: [
    CommonModule,
    UtilityRoutingModule,
    FormsModule,
    MenuModule,
    TableModule,
    TreeModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    HrmBreadCrumbModule,
    SkeletonModule,
    DropdownModule,
    PaginatorModule,
    ToastModule,
    ToolbarModule,
    OverlayPanelModule,
    DividerModule,
    SidebarModule,
    CalendarModule,
    ListGridAngularModule,
    LoadingGridModule,
    AutoCompleteModule,
  ],
  providers: [UtilityManagerService]
})
export class UtilityModule { }
