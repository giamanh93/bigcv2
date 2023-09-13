import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBaoCaoRoutingModule } from './menu-bao-cao-routing.module';
import { MenuBaoCaoComponent } from './menu-bao-cao/menu-bao-cao.component';
import {FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';
import {HrmBreadCrumbModule} from '../../common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import {SkeletonModule} from 'primeng/skeleton';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {PaginatorModule} from 'primeng/paginator';
import {ToolbarModule} from 'primeng/toolbar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DividerModule} from 'primeng/divider';
import {SidebarModule} from 'primeng/sidebar';
import {CalendarModule} from 'primeng/calendar';
import {ListGridAngularModule} from '../../common/components/list-grid-angular/list-grid-angular.module';
import {LoadingGridModule} from '../../common/components/loading-grid/loading-grid.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {financialControlSystemService} from '../../services/financialControlSystem.service';
@NgModule({
  declarations: [
    MenuBaoCaoComponent
  ],
  imports: [
    CommonModule,
    MenuBaoCaoRoutingModule,
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
    AutoCompleteModule
  ],
  providers: [financialControlSystemService]
})
export class MenuBaoCaoModule { }
