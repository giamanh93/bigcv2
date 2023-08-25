import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-nz-autocomplete',
  templateUrl: './nz-autocomplete.component.html',
  styleUrls: ['./nz-autocomplete.component.scss']
})
export class NzAutocompleteComponent  extends FieldType<FieldTypeConfig> implements OnInit{
  ngOnInit(): void {
   
  }
}
