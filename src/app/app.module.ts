import {ConfirmationService, MessageService} from 'primeng/api';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MenuModule} from 'primeng/menu';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './shared/footer/footer.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {MenubarModule} from 'primeng/menubar';
import {AvatarModule} from 'primeng/avatar';
import {ToolbarModule} from 'primeng/toolbar';
import {DefaultLayoutComponent} from './containers/default-layout';
import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {ChartModule} from 'primeng/chart';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {PanelMenuModule} from 'primeng/panelmenu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {DatePipe} from '@angular/common';
import 'ag-grid-enterprise';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AuthService} from './services/auth/auth.service';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {AuthInterceptor} from './services/auth/auth-interceptor';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {OurCustomerComponent} from './pages/our-customer/our-customer.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {GalleriaModule} from 'primeng/galleria';
import {DEFAULT_REFRESH_URL_BLACKLIST, REFRESH_URL_BLACKLIST} from './services/auth/url-blacklist';
import { RxStompService } from './rx-stomp.service';
import { rxStompServiceFactory } from './rx-stomp-service-factory';
@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HomePageComponent,
    OurCustomerComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MenubarModule,
    AvatarModule,
    ToolbarModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    ToastModule,
    NgxSpinnerModule,
    ConfirmDialogModule,
    GalleriaModule,
    // LoginModule
  ],
  providers: [
    MessageService,
    DatePipe,
    ConfirmationService,
    MessageService,
    AuthService,
    AuthGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: REFRESH_URL_BLACKLIST,
      useValue: DEFAULT_REFRESH_URL_BLACKLIST,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
