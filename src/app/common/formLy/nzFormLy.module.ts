import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StyleClassModule} from 'primeng/styleclass';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyPrimeNGModule} from '@ngx-formly/primeng';
import {InputTextModule} from 'primeng/inputtext';
import {NzTextareaComponent} from './nz-textarea/nz-textarea.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {NzDropdownComponent} from './nz-dropdown/nz-dropdown.component';
import {CheckboxModule} from 'primeng/checkbox';
import {NzCheckboxComponent} from './nz-checkbox/nz-checkbox.component';
import {ArrayTypeComponent} from './array.type';
import {TableModule} from 'primeng/table';
import {RepeatTypeComponent} from './repeat-section.type';
import {NzCalendarComponent} from './nz-calendar/nz-calendar.component';
import {NzRadiobuttonComponent} from './nz-radiobutton/nz-radiobutton.component';
import {NzInputComponent} from './nz-input/nz-input.component';
import {PanelWrapperComponent} from './panel-wapper';
import {NzAutocompleteComponent} from './nz-autocomplete/nz-autocomplete.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NzTreeSelectComponent} from './nz-tree-select/nz-tree-select.component';
import {TreeSelectModule} from 'primeng/treeselect';
import {MultiSelectModule} from 'primeng/multiselect';
import {NzMultiselectComponent} from './nz-multiselect/nz-multiselect.component';
import {NzAvatarComponent} from './nz-avatar/nz-avatar.component';
import {ImageModule} from 'primeng/image';
import {NzLinkUrlComponent} from './nz-link-url/nz-link-url.component';
import {NzInputNumberComponent} from './nz-input-number/nz-input-number.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {NzPasswordComponent} from './nz-password/nz-password.component';
import {PasswordModule} from 'primeng/password';
import {DialogModule} from 'primeng/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {PaginatorModule} from 'primeng/paginator';
import {NzTimeComponent} from './nz-time/nz-time.component';

export function phoneValidator(control: AbstractControl): any {
  const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return (!regex.test(control.value)) ? {phoneError: true} : null;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StyleClassModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    FormlyPrimeNGModule,
    AutoCompleteModule,
    CheckboxModule,
    TableModule,
    TreeSelectModule,
    MultiSelectModule,
    ImageModule,
    InputNumberModule,
    PasswordModule,
    DialogModule,
    TranslateModule,
    PaginatorModule,
    FormlyModule.forRoot({
      validators: [{name: 'phoneError', validation: phoneValidator}],
      types: [
        {
          name: 'nzInput',
          component: NzInputComponent,
          extends: 'input',

        },
        {
          name: 'nzInputNumber',
          component: NzInputNumberComponent,
          extends: 'input',

        },
        {
          name: 'nzTextarea',
          component: NzTextareaComponent,
          extends: 'textarea',
        },
        {
          name: 'nzDropdown',
          component: NzDropdownComponent,
          extends: 'input',
        },
        {
          name: 'nzCheckbox',
          component: NzCheckboxComponent,
          extends: 'checkbox',
        },
        {
          name: 'nzDateTime',
          component: NzCalendarComponent,
          extends: 'input',
        },
        {
          name: 'nzTime',
          component: NzTimeComponent,
          extends: 'input',
        },
        {
          name: 'nzAutocomplete',
          component: NzAutocompleteComponent,
          extends: 'input',
        },
        {
          name: 'nzTreeSelect',
          component: NzTreeSelectComponent,
          extends: 'input',
        },
        {
          name: 'nzMultiSelect',
          component: NzMultiselectComponent,
          extends: 'input',
        },
        {
          name: 'nzImage',
          component: NzAvatarComponent,
        },
        {
          name: 'nzLinkUrl',
          component: NzLinkUrlComponent,
          extends: 'input',
        },
        {
          name: 'nzPassword',
          component: NzPasswordComponent,
          extends: 'input',
        },
        {name: 'array', component: ArrayTypeComponent},
        {name: 'repeat', component: RepeatTypeComponent},
        {name: 'nzpanel', component: PanelWrapperComponent},

      ],
      validationMessages: [
        {name: 'required', message: 'Trường bắt buộc nhập'},
        {name: 'phoneError', message: 'Số điện thoại không hợp lệ'},
      ],
    }),
  ],
  providers: [],
  declarations: [
    NzInputComponent,
    NzTextareaComponent,
    NzDropdownComponent,
    NzCheckboxComponent,
    ArrayTypeComponent,
    RepeatTypeComponent,
    NzCalendarComponent,
    NzTimeComponent,
    NzRadiobuttonComponent,
    PanelWrapperComponent,
    NzAutocompleteComponent,
    NzTreeSelectComponent,
    NzMultiselectComponent,
    NzAvatarComponent,
    NzLinkUrlComponent,
    NzInputNumberComponent,
    NzPasswordComponent
  ]
})
export class NzFormLyModule {
}
