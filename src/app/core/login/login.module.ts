import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {SharedModule} from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';
import {InputSwitchModule} from 'primeng/inputswitch';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {NzFormLyModule} from 'src/app/common/formLy/nzFormLy.module';
import {FormlyModule} from '@ngx-formly/core';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    SharedModule,
    CheckboxModule,
    InputSwitchModule,
    LoginRoutingModule,
    NzFormLyModule,
    OverlayPanelModule,
    FormlyModule.forRoot(),
  ],
  exports: [LoginComponent],
  providers: []
})
export class LoginModule {
}
