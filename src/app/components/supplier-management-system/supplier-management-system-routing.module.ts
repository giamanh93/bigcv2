import {FollowInventorySupplierComponent} from './follow-inventory-supplier/follow-inventory-supplier.component';
import {
  FollowEffectivePromotionSupplierComponent
} from './follow-effective-promotion-supplier/follow-effective-promotion-supplier.component';
import {FollowProductCancelSupplierComponent} from './follow-product-cancel-supplier/follow-product-cancel-supplier.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FollowProfitProductSupplierComponent} from './follow-profit-product-supplier/follow-profit-product-supplier.component';
import {SupplierManagementSystemComponent} from './supplier-management-system.component';
// { label: '1. Theo dõi lợi nhuận sản phẩm nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-profit-product-supplier' },
//           { label: '2. Theo dõi sản phẩm hỏng hủy theo từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-product-cancel-supplier' },
//           { label: '3. Theo dõi hiệu quả chiến dịch khuyến mãi từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-effective-promotion-supplier' },
//           { label: '4. Theo dõi lượng hàng tồn theo từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-inventory-supplier' },
@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: FollowProfitProductSupplierComponent},
    {path: 'follow-profit-product-supplier', component: FollowProfitProductSupplierComponent},
    {path: 'follow-product-cancel-supplier', component: FollowProductCancelSupplierComponent},
    {path: 'follow-effective-promotion-supplier', component: FollowEffectivePromotionSupplierComponent},
    {path: 'follow-inventory-supplier', component: FollowInventorySupplierComponent},
  ])],
  exports: [RouterModule]
})
export class SupplierManagementSystemRoutingModule {
}
