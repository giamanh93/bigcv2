import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-textarea',
  templateUrl: './nz-textarea.component.html',
  styleUrls: ['./nz-textarea.component.scss']
})
export class NzTextareaComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  get type() {
    return this.props.type || 'text';
  }

  ngOnInit(): void {
   setTimeout(() => {
    this.field.focus = true;
   },200)
  }
}
