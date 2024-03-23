import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER, ErrorHandler, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient,HttpClientModule, HTTP_INTERCEPTORS, HttpBackend } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { DatePipe, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { AppConfigService } from './core/services/app-config.service';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AppErrorHandlerService } from './core/services/app-error-handler/app-error-handler.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfigService } from './core/services/util-service.service';
import * as locale_en from '@angular/common/locales/en';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { LayoutComponent } from './layout/layout.component';
import { EmpProfileComponent } from './emp-profile/emp-profile.component';
import { CoreKitModule } from 'core-kit';

export function HttpLoaderFactory(http:HttpBackend): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(http, [{
    prefix: './assets/locales/',suffix: '.json'
  },])
}

export function getCulture(utilService : ConfigService){
  let locale_id: string;
  switch(utilService.getLocaleId()){
    case 'en':
      locale_id = 'en-US';
      registerLocaleData(locale_en,locale_id);
      break;
    default:
      break;
  }
  return locale_id;
}

export function appInit(appConfigService:AppConfigService):any{
  return () => appConfigService.load();
}

@NgModule({
  declarations: [		
    AppComponent,LoginComponent,
      LayoutComponent,
      EmpProfileComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    NgOtpInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
    CoreKitModule
  ],
  providers: [
    DatePipe,
    {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: APP_INITIALIZER, useFactory: appInit, multi: true, deps: [AppConfigService]},
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: ErrorHandler, useClass: AppErrorHandlerService},
    {provide: LOCALE_ID, deps: [ConfigService], useFactory:getCulture},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
