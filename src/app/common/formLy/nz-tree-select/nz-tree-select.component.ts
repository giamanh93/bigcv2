import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
export interface OptionDropdown {
  label: string;
  value: string | number
}
@Component({
  selector: 'app-nz-tree-select',
  templateUrl: './nz-tree-select.component.html',
  styleUrls: ['./nz-tree-select.component.scss']
})
export class NzTreeSelectComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  listOptions: any = []
  isFilter = false;
 
  ngOnInit(): void {
    const lists: any = this.field.props.options;
    this.listOptions = lists;
  }
}
