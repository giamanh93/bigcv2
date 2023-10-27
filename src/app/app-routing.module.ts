import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from './containers/default-layout';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {
  FollowUpCustomerSalesProductComponent
} from './components/customer-management-system/follow-up-customer-sales-product/follow-up-customer-sales-product.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {OurCustomerComponent} from './pages/our-customer/our-customer.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {SyncRoutingModule} from './components/sync/sync-routing.module';
import {ReviewPageModule} from './components/review-page/review-page.module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full',
      },
      {path: 'home-page', component: HomePageComponent},
      {path: 'our-customer', component: OurCustomerComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'login', loadChildren: () => import('../app/core/login/login.module').then(m => m.LoginModule)},
      {
        path: '', component: DefaultLayoutComponent,
        children: [
          {path: 'home', loadChildren: () => import('../app/components/dashboard/dashboard.module').then(m => m.DashboardModule)},
          {
            path: 'bao-cao',
            loadChildren: () => import('../app/components/menu-bao-cao/menu-bao-cao.module').then(m => m.MenuBaoCaoModule)
          },
          {
            path: 'customer-mgmt-system',
            loadChildren: () => import('../app/components/customer-management-system/customer-management-system.module').then(m => m.CustomerManagementSystemModule)
          },
          {
            path: 'early-warning-system',
            loadChildren: () => import('../app/components/early-warning-system/early-warning-system.module').then(m => m.EarlyWarningSystemModule)
          },
          {
            path: 'control-system',
            loadChildren: () => import('../app/components/control-system/control-system.module').then(m => m.ControlSystemModule)
          },
          {
            path: 'financial-control-system',
            loadChildren: () => import('../app/components/financial-control-system/financial-control-system.module').then(m => m.FinancialControlSystemModule)
          },
          {
            path: 'supplier-mgmt-system',
            loadChildren: () => import('../app/components/supplier-management-system/supplier-management-system.module').then(m => m.SupplierManagementSystemModule)
          },
          {
            path: 'product-manager',
            loadChildren: () => import('../app/components/product-manager/product-manager.module').then(m => m.ProductManagerModule)
          },
          {path: 'utility', loadChildren: () => import('../app/components/utility/utility.module').then(m => m.UtilityModule)},
          {path: 'sync', loadChildren: () => import('../app/components/sync/sync.module').then(m => m.SyncModule)},
          {path: 'review', loadChildren: () => import('../app/components/review-page/review-page.module').then(m => m.ReviewPageModule)},
          {
            path: 'order-purchase',
            loadChildren: () => import('../app/components/purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule)
          },
        ],  canActivate: [AuthGuardService]
        // ], canActivate: [AuthGuardService]
      },
      // { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
      // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
      // { path: 'notfound', component: NotfoundComponent },
      // { path: '**', redirectTo: '/notfound' },
    ])
    // ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
