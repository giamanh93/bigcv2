import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-checkbox',
  templateUrl: './nz-checkbox.component.html',
  styleUrls: ['./nz-checkbox.component.scss']
})
export class NzCheckboxComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  get type() {
    return this.props.type || 'text';
  }

  ngOnInit(): void {
  }
}
