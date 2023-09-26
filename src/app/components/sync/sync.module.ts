import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductManagerService} from 'src/app/services/productManager.serivce';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';
import {HrmBreadCrumbModule} from 'src/app/common/hrm-breadcrumb/hrm-breadcrumb.module';
import {SkeletonModule} from 'primeng/skeleton';
import {DropdownModule} from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {ToolbarModule} from 'primeng/toolbar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DividerModule} from 'primeng/divider';
import {SidebarModule} from 'primeng/sidebar';
import {CalendarModule} from 'primeng/calendar';
import {ListGridAngularModule} from 'src/app/common/components/list-grid-angular/list-grid-angular.module';
import {LoadingGridModule} from 'src/app/common/components/loading-grid/loading-grid.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MenuModule} from 'primeng/menu';
import {TreeModule} from 'primeng/tree';
import {ToastModule} from 'primeng/toast';
import {ListSyncComponent} from './list-sync/list-sync.component';
import {SyncRoutingModule} from './sync-routing.module';
import {SyncService} from '../../services/sync.service';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {RxStompService} from '../../rx-stomp.service';
import {rxStompServiceFactory} from '../../rx-stomp-service-factory';

@NgModule({
  declarations: [
    ListSyncComponent,
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
    SyncRoutingModule,
    ConfirmDialogModule
  ],
  providers: [ProductManagerService
    , SyncService
    , {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
    ]
})
export class SyncModule {
}

