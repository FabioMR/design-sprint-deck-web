import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgSelectModule, NgSelectConfig } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { JwtModule } from '@auth0/angular-jwt';

import * as moment from 'moment';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

import { ResponseInterceptor } from '@interceptors/response.interceptor';

import { DecimalPipe } from '@angular/common';
import { PluralizePipe } from '@pipes/pluralize.pipe';
import { NullPipe } from '@pipes/null.pipe';

import { TooltipDirective } from '@directives/tooltip.directive';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { LayoutComponent } from '@components/layout/layout.component';
import { EnvironmentLabelComponent } from '@components/environment-label/environment-label.component';
import { FormControlErrorsComponent } from '@components/form-control-errors/form-control-errors.component';
import { ModalAlertComponent } from '@components/modal/modal-alert.component';
import { ModalConfirmComponent } from '@components/modal/modal-confirm.component';
import { ToastComponent } from '@components/toast/toast.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { IconComponent } from '@components/icon/icon.component';
import { PaginationComponent } from '@components/pagination/pagination.component';

import { HomeComponent } from '@pages/home/home.component';

import { TermsOfUseComponent } from '@pages/terms-of-use/terms-of-use.component';
import { Error404Component } from '@pages/error/error-404.component';
import { Error500Component } from '@pages/error/error-500.component';

export function tokenGetter() {
  return localStorage.token;
}

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@NgModule({
  declarations: [
    PluralizePipe,
    NullPipe,
    TooltipDirective,
    AppComponent,
    LayoutComponent,
    EnvironmentLabelComponent,
    FormControlErrorsComponent,
    ModalAlertComponent,
    ModalConfirmComponent,
    ToastComponent,
    LoaderComponent,
    IconComponent,
    PaginationComponent,
    HomeComponent,
    TermsOfUseComponent,
    Error404Component,
    Error500Component
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    JwtModule.forRoot({ config: { tokenGetter: tokenGetter } })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    DecimalPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    selectConfig: NgSelectConfig,
  ) {
    moment.locale('pt-BR');

    selectConfig.notFoundText = 'Nenhum item encontrado';
    selectConfig.loadingText = 'Carregando...';
  }
}
