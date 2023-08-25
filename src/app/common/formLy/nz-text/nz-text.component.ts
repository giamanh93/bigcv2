import { Component, OnInit } from '@angular/core';
import {FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-text',
  template: `
      <div [innerHTML]="to['addText']"></div>
`
})
export class NzTextComponent extends FieldType<FieldTypeConfig> {



}