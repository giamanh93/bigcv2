import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommingUpCustomerComponent } from './comming-up-customer/comming-up-customer.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CommingUpCustomerComponent },
        { path: 'comming-up-customer', component: CommingUpCustomerComponent },
    ])],
    exports: [RouterModule]
})
export class UtilityRoutingModule { }
