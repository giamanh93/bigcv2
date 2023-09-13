import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from '../../pages/home-page/home-page.component';
import {OurCustomerComponent} from '../../pages/our-customer/our-customer.component';
import {AboutUsComponent} from '../../pages/about-us/about-us.component';
import {DefaultLayoutComponent} from '../../containers/default-layout';
import {MenuBaoCaoComponent} from './menu-bao-cao/menu-bao-cao.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '#',
    pathMatch: 'full',
  },
  {
    path: '#', component: MenuBaoCaoComponent,
    children: [
      {
        path: 'customer-mgmt-system',
        loadChildren: () => import('../../components/customer-management-system/customer-management-system.module')
          .then(m => m.CustomerManagementSystemModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuBaoCaoRoutingModule {
}
