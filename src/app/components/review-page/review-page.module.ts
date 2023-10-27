import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewPageRoutingModule } from './review-page-routing.module';
import { ReviewTransferIndayComponent } from './review-transfer-inday/review-transfer-inday.component';
import {FormsModule} from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {TreeModule} from 'primeng/tree';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';
import {HrmBreadCrumbModule} from '../../common/hrm-breadcrumb/hrm-breadcrumb.module';
import {SkeletonModule} from 'primeng/skeleton';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DividerModule} from 'primeng/divider';
import {SidebarModule} from 'primeng/sidebar';
import {CalendarModule} from 'primeng/calendar';
import {ListGridAngularModule} from '../../common/components/list-grid-angular/list-grid-angular.module';
import {LoadingGridModule} from '../../common/components/loading-grid/loading-grid.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {SyncRoutingModule} from '../sync/sync-routing.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProductManagerService} from '../../services/productManager.serivce';
import {SyncService} from '../../services/sync.service';
import {RxStompService} from '../../rx-stomp.service';
import {rxStompServiceFactory} from '../../rx-stomp-service-factory';
import {ReviewService} from '../../services/review.service';
import {PurchaseOrderRoutingModule} from '../purchase-order/purchase-order-routing.module';
import {ImageModule} from 'primeng/image';
import {DialogModule} from 'primeng/dialog';
import {ChipModule} from 'primeng/chip';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {NgxPanZoomModule} from 'ngx-panzoom';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {AvatarModule} from 'primeng/avatar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    ReviewTransferIndayComponent
  ],
  imports: [
    ReviewPageRoutingModule,
    CommonModule,
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
    SplitButtonModule,
    ProgressSpinnerModule

  ],
  providers: [ProductManagerService
    , SyncService, ReviewService
    , {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ]
})
export class ReviewPageModule { }
