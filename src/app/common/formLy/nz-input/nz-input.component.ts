import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-input',
  templateUrl: './nz-input.component.html',
  styleUrls: ['./nz-input.component.scss']
})
export class NzInputComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  get type() {
    return this.props.type || 'text';
  }

  ngOnInit(): void {
  }
}
