import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { InputOrderComponent } from './input-order/input-order.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule } from 'primeng/tree';
import { ListGridAngularModule } from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import { LoadingGridModule } from 'src/app/common/components/loading-grid/loading-grid.module';
import { HrmBreadCrumbModule } from 'src/app/common/hrm-breadcrumb/hrm-breadcrumb.module';
import { PurchaseOrderService } from 'src/app/services/purcher-order.service';
import { DropdownRenderComponent } from 'src/app/common/components/list-grid-angular/dropdown-render/dropdown-render.component';
import { EditProductDetailComponent } from './input-order/edit-product-detail/edit-product-detail.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ProductManagerService } from 'src/app/services/productManager.serivce';
import { financialControlSystemService } from 'src/app/services/financialControlSystem.service';
import { ImageModule } from 'primeng/image';
import { NgxPanZoomModule } from 'ngx-panzoom';
import {TileComponent} from './input-order/tile';
import { ChipModule } from 'primeng/chip';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import {CustomTooltip} from '../../common/components/list-grid-angular/tooltip-render/tooltip-render';
import { UnitChangeComponent } from './input-order/unit-change/unit-change.component';
import { OrderShipComponent } from './input-order/order-ship/order-ship.component';
import { OrderPaymentComponent } from './input-order/order-payment/order-payment.component';
import { UploadImageOrderComponent } from './upload-image-order/upload-image-order.component';
import {AgGridImageComponent} from '../../common/components/list-grid-angular/aggrid-image';
import {AvatarModule} from 'primeng/avatar';
import { ListImagePurchaseOrderComponent } from './list-image-purchase-order/list-image-purchase-order.component';
import {ButtonAgGridComponent} from '../../common/components/list-grid-angular/ag-buttons';
import {SplitButtonModule} from 'primeng/splitbutton';
@NgModule({
  declarations: [
    InputOrderComponent,
    DropdownRenderComponent,
    EditProductDetailComponent,
    TileComponent,
    CustomTooltip,
    UnitChangeComponent,
    OrderShipComponent,
    OrderPaymentComponent,
    UploadImageOrderComponent,
    AgGridImageComponent,
    ListImagePurchaseOrderComponent,
    ButtonAgGridComponent,
  ],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    FormsModule,
    MenuModule,
    TableModule,
    TreeModule,
    ImageModule,
    StyleClassModule,
    DialogModule,
    ChipModule,
    PanelMenuModule,
    ButtonModule,
    HrmBreadCrumbModule,
    SkeletonModule,
    DropdownModule,
    SelectButtonModule,
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
    FileUploadModule,
    NgxPanZoomModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    AvatarModule,
    SplitButtonModule
  ],
  providers: [PurchaseOrderService, ProductManagerService, financialControlSystemService]
})
export class PurchaseOrderModule { }
