import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-password',
  templateUrl: './nz-password.component.html',
  styleUrls: ['./nz-password.component.scss']
})
export class NzPasswordComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  get type() {
    return this.props.type || 'text';
  }

  ngOnInit(): void {
    console.log(this.props)
  }
}
