import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {MenuModule} from 'primeng/menu';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';
import {SupplierManagementSystemRoutingModule} from './supplier-management-system-routing.module';
import {SupplierManagementSystemComponent} from './supplier-management-system.component';
import {HrmBreadCrumbModule} from 'src/app/common/components/hrm-breadcrumb/hrm-breadcrumb.module';
import {FollowProfitProductSupplierComponent} from './follow-profit-product-supplier/follow-profit-product-supplier.component';
import {FollowProductCancelSupplierComponent} from './follow-product-cancel-supplier/follow-product-cancel-supplier.component';
import {
  FollowEffectivePromotionSupplierComponent
} from './follow-effective-promotion-supplier/follow-effective-promotion-supplier.component';
import {FollowInventorySupplierComponent} from './follow-inventory-supplier/follow-inventory-supplier.component';

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
    SupplierManagementSystemRoutingModule,
    HrmBreadCrumbModule
  ],
  declarations: [
    SupplierManagementSystemComponent
    , FollowProfitProductSupplierComponent
    , FollowProductCancelSupplierComponent
    , FollowEffectivePromotionSupplierComponent
    , FollowInventorySupplierComponent]
})
export class SupplierManagementSystemModule {
}
