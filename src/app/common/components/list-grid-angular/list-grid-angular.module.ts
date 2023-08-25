import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {ListGridAngularComponent} from './list-grid-angular.component';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {AgGridModule} from 'ag-grid-angular';
import {TotalValueFooterComponent} from '../total-value-component/total-value-component';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [ListGridAngularComponent, TotalValueFooterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AgGridModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    AutoCompleteModule
  ],
  entryComponents: [],
  exports: [
    ListGridAngularComponent
  ],
  providers: []
})
export class ListGridAngularModule {
}
