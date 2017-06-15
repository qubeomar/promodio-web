import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthenticationService } from '../common/services/authentication.service';
import { UserInfoModel } from '../common/models/user-info.model';

@Injectable()

export class AuthenticationResolver implements Resolve<any> {
  constructor(private authenticationService: AuthenticationService) {};

  public resolve(): Observable<UserInfoModel> {
    return this.authenticationService.getUserInfo(true);
  }
}

export const APP_RESOLVER_PROVIDERS = [
  AuthenticationResolver
];
