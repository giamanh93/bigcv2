import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HrmBreadCrumbComponent } from './hrm-breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@NgModule({
  declarations: [
    HrmBreadCrumbComponent,
   ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BreadcrumbModule
  ],
  exports: [HrmBreadCrumbComponent],
  entryComponents: [],
  providers: []
})
export class HrmBreadCrumbModule { }
