import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputOrderComponent } from './input-order/input-order.component';
import {UploadImageOrderComponent} from './upload-image-order/upload-image-order.component';
import {ListImagePurchaseOrderComponent} from './list-image-purchase-order/list-image-purchase-order.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InputOrderComponent },
    { path: 'input-purchase-order', component: InputOrderComponent, data: {url: 'input-purchase-order', title: 'Nhập hoá đơn từ tệp ảnh'} },
    { path: 'view-detail-purchase-order', component: InputOrderComponent, data: {url: 'view-detail-purchase-order', title: 'Chi tiết hóa đơn'} },
    { path: 'upload-image', component: UploadImageOrderComponent },
    { path: 'list-image-purchase-order', component: ListImagePurchaseOrderComponent },
])],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
