import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-calendar',
  templateUrl: './nz-calendar.component.html',
  styleUrls: ['./nz-calendar.component.scss']
})
export class NzCalendarComponent  extends FieldType<FieldTypeConfig> implements OnInit{

  ngOnInit(): void {
  }
}
