import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ListSyncComponent} from './list-sync/list-sync.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ListSyncComponent },
    { path: 'listsync', component: ListSyncComponent },
  ])],
  exports: [RouterModule]
})
export class SyncRoutingModule { }
