import {Component, OnInit} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
      <formly-field class="col" [field]="field"></formly-field>
      <div class="col-sm-2 flex align-items-center">
      </div>
      <button class="btn btn-danger" type="button" (click)="remove(i)">Remove</button>
      <button class="btn" type="button" (click)="add()">Add</button>
    </div>

  `,
})
export class RepeatTypeComponent extends FieldArrayType implements OnInit {
  fieldGroup: any = [];

  ngOnInit() {
    console.log(this.field.fieldGroup);
    if (this.field.fieldGroup && this.field.fieldGroup.length > 0) {
      this.fieldGroup = this.field.fieldGroup[0].fieldGroup;
    } else {
      this.fieldGroup = [];
      // this.to.add = this.add.bind(this);
      // this.to.remove = this.remove.bind(this);
    }
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */
