import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-input-number',
  templateUrl: './nz-input-number.component.html',
  styleUrls: ['./nz-input-number.component.scss']
})
export class NzInputNumberComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  get type() {
    return this.props.type || 'text';
  }

  ngOnInit(): void {
  }
}
