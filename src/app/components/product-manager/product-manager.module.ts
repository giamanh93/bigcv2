import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagerRoutingModule } from './product-manager-routing.module';
import { TrackCustomerByProductComponent } from './track-customer-by-product/track-customer-by-product.component';
import { TrackCustomerByProductCategoryComponent } from './track-customer-by-product-category/track-customer-by-product-category.component';
import { ProductManagerService } from 'src/app/services/productManager.serivce';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { HrmBreadCrumbModule } from 'src/app/common/hrm-breadcrumb/hrm-breadcrumb.module';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuModule } from 'primeng/menu';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    TrackCustomerByProductComponent,
    TrackCustomerByProductCategoryComponent
  ],
  imports: [
    CommonModule,
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
    ProductManagerRoutingModule,

  ],
  providers: [ProductManagerService]
})
export class ProductManagerModule { }
