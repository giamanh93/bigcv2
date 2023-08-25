import {Component, OnInit} from '@angular/core';
import {FieldType, FieldTypeConfig} from '@ngx-formly/core';
import {cloneDeep} from 'lodash';
import {of} from 'rxjs';

export interface OptionDropdown {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-nz-multiselect',
  templateUrl: './nz-multiselect.component.html',
  styleUrls: ['./nz-multiselect.component.scss']
})
export class NzMultiselectComponent extends FieldType<FieldTypeConfig> implements OnInit {
  listOptions: any = [];
  isFilter = false;

  dataSelects: any = [] = [];
  isSearchEmp: boolean = false;

  ngOnInit(): void {
    const lists: any = this.field.props.options;
    this.listOptions = lists;
  }

  search() {
    this.isSearchEmp = true;
  }

  callbackSeach(event: any[]) {
    if (event.length > 0 && this.field) {
      this.dataSelects = cloneDeep(event);
      this.listOptions = event.map(item => {
        return {
          name: item.FullName,
          value: item.Oid
        };
      });
      this.formControl.setValue(this.listOptions.map((d: any) => d.value));
      this.isSearchEmp = false;
    } else {
      this.isSearchEmp = false;
    }
  }
}
