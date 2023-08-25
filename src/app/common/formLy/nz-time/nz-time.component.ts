import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-time',
  templateUrl: './nz-time.component.html',
  styleUrls: ['./nz-time.component.scss']
})
export class NzTimeComponent  extends FieldType<FieldTypeConfig> implements OnInit{

  ngOnInit(): void {
  }
}
