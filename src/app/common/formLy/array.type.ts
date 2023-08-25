import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-array-type',
  template: `


      

  <div class="field grid">
  <label for="firstname3" class="col-fixed font-semibold" style="width:150px">{{to.label}} <span
          *ngIf="to.required">*</span></label>
  <div class="col">
  <div class="table-responsive">
  <table class="table table-hover table_detail p-datatable-striped w-full">
    
    <thead>
      <tr *ngFor="let f of field.fieldGroup; let i = index;">
         <th scope="col"  *ngIf="i=== 0">STT</th>
         <ng-container *ngFor="let f1 of f.fieldGroup; let idx = index;">
             <th scope="col"  *ngIf="i=== 0">{{f1.props?.label}}</th>
         </ng-container>
         <th scope="col"  *ngIf="i=== 0">
             <span (click)="add()">Thêm</span>
         </th>
 
      </tr>
    </thead>
    
    <tbody>
      <tr *ngFor="let f of field.fieldGroup; let i = index;">
      <td class="flex">
             {{i+1}}
        </td>
        <td *ngFor="let f1 of f.fieldGroup; let idx = index;">
          <formly-field class="flex-1"  [field]="f1"></formly-field>
        </td>
        <td class="flex gap-2 justify-content-center">
             <p-button label="Sửa" styleClass="p-button-sm " (click)="remove(i)"></p-button>
             <p-button label="Xóa" styleClass="p-button-sm p-button-danger" (click)="remove(i)"></p-button>
        </td>
      </tr>
    </tbody>
 
  </table>
  <div class="flex gap-2 justify-content-end" >
      <p-button label="Sửa" styleClass="p-button-sm " (onClick)="add()"></p-button>
      <p-button label="Xóa" styleClass="p-button-sm p-button-danger" ></p-button>
      <p-button label="Sửa" styleClass="p-button-sm "></p-button>
      <p-button label="Xóa" styleClass="p-button-sm p-button-danger" ></p-button>
  </div>
 </div>
  </div>
</div>










    
  `,
})
export class ArrayTypeComponent extends FieldArrayType {}


/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */


