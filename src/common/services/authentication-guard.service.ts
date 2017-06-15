import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, Observer } from 'rxjs';

@Injectable()

export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {};

  public canActivate(): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.authenticationService.getUserInfo().subscribe(
        () => {
          observer.next(true);
          observer.complete();
        },
        () => {
          observer.next(true);
          observer.complete();
        }
      );
    });
  };
}
