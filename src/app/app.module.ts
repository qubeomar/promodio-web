import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ENV_PROVIDERS } from './environment';
import { APP_RESOLVER_PROVIDERS } from './authentication.resolver';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found';
import { ForbiddenComponent } from './forbidden';
import { XLargeDirective } from './home/x-large';

import { LocalstorageService } from '../common/services/localstorage.service';
import { HttpInterceptorService } from '../common/services/http-interceptor.service';
import { AuthenticationService } from '../common/services/authentication.service';

import '../styles/styles.css';
import { AuthenticationGuard } from '../common/services/authentication-guard.service';

const APP_PROVIDERS = [
  AuthenticationGuard,
  LocalstorageService,
  HttpInterceptorService,
  AuthenticationService
];

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    APP_RESOLVER_PROVIDERS
  ]
})

export class AppModule {}
