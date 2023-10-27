import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ReviewTransferIndayComponent} from './review-transfer-inday/review-transfer-inday.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ReviewTransferIndayComponent },
    { path: 'review-transfer-inday'
      , component: ReviewTransferIndayComponent
      , data: {
        title: 'Đối soát'
      }},
  ])],
  exports: [RouterModule]
})
export class ReviewPageRoutingModule { }
