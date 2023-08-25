import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrackCustomerByProductCategoryComponent } from './track-customer-by-product-category/track-customer-by-product-category.component';
import { TrackCustomerByProductComponent } from './track-customer-by-product/track-customer-by-product.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TrackCustomerByProductComponent },
        { path: 'track-customer-by-product', component: TrackCustomerByProductComponent },
        { path: 'customer-by-product-category', component: TrackCustomerByProductCategoryComponent },
    ])],
    exports: [RouterModule]
})
export class ProductManagerRoutingModule { }
