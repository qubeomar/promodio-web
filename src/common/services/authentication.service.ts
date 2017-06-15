import { Injectable, EventEmitter } from '@angular/core';
import { HttpInterceptorService } from './http-interceptor.service';
import { TypedJSON } from 'typedjson-npm/src/typed-json';
import { Observable, Observer } from 'rxjs';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { UserInfoModel } from '../models/user-info.model';
import { LocalstorageService } from './localstorage.service';

@Injectable()

export class AuthenticationService {
  public userInfo: UserInfoModel;
  public isLoading: boolean = false;
  public isLoaded: boolean = false;

  public onuserinfochange: EventEmitter<UserInfoModel> = new EventEmitter();

  private URL: string = 'user';

  constructor(private http: HttpInterceptorService,
              private router: Router,
              private localstorageService: LocalstorageService) {};

  public getUserInfo(redirect: boolean = false): Observable<UserInfoModel> {
    let context: AuthenticationService = this;
    return Observable.create((observer: Observer<UserInfoModel>) => {
      if (context.userInfo) {
        observer.next(context.userInfo);
        observer.complete();
      } else {
        context.isLoading = true;
        context.http.get(context.URL).subscribe(
          (response: Response) => {
            context.userInfo = TypedJSON.parse(response['_body'], UserInfoModel);
            context.isLoading = false;
            context.isLoaded = true;
            context.onuserinfochange.emit(this.userInfo);
            observer.next(context.userInfo);
            observer.complete();
          },
          () => {
            context.isLoading = false;
            context.isLoaded = true;
            this.localstorageService.deleteValue('token');
            this.userInfo = null;
            context.onuserinfochange.emit(this.userInfo);
            observer.next(null);
            observer.complete();

            if (redirect) {
              context.router.navigateByUrl('/login');
            }
          }
        );
      }
    });
  };

  public isLogged(): boolean {
    return !!this.userInfo;
  };

  public login(token: string): void {
    this.localstorageService.setValue('token', token);
    this.userInfo = null;
    this.getUserInfo().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  };

  public logout(): void {
    this.localstorageService.deleteValue('token');
    this.userInfo = null;
    this.onuserinfochange.emit(this.userInfo);
    this.router.navigateByUrl('/');
  };
}
