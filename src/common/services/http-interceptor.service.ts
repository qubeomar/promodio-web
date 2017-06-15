import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptionsArgs,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { LocalstorageService } from './localstorage.service';

@Injectable()

export class HttpInterceptorService {
  private domain: string = 'http://69.89.12.90:8080/v1/api/';

  constructor(private http: Http,
              private localstorageService: LocalstorageService) {};

  public get( url: string,
              params?: { [ key: string ]: string | number },
              options?: { [ key: string ]: string }): Observable<Response> {
    let preparedParams: string = this.createQueryString(params) || null;

    return this
            .http
            .get(
              `${this.domain}${url}${preparedParams ? preparedParams : ''}`,
              this.optionsChecker(options)
            );
  }

  public post(url: string,
              params?: { [ key: string ]: any } | FormData,
              options?: { [ key: string ]: string }): Observable<Response> {
    return this.http.post(this.domain + url, params, this.optionsChecker(options));
  }

  public patch(url: string,
               params?: { [ key: string ]: any } | FormData,
               options?: { [ key: string ]: string }): Observable<Response> {
    return this.http.patch(this.domain + url, params, this.optionsChecker(options));
  }

  private optionsChecker(options?: { [ key: string ]: string }): RequestOptionsArgs {
    let newOptions = new RequestOptions();
    newOptions.headers = new Headers();

    if (options && typeof options === 'object') {
      for (let key in options) {
        if (options.hasOwnProperty(key)) {
          newOptions.headers.append(key, options[ key ]);
        }
      }
    } else {
      newOptions.headers.append('Content-Type', 'application/json');
    }

    let token: string = this.localstorageService.getValue('token');
    if (token) {
      newOptions.headers.append('Authentication', token);
    }

    return newOptions;
  }

  private createQueryString(params: { [ key: string ]: string | number } | null): string {
    if (!params) {
      return null;
    }

    let keys: any[] = Object.keys(params);
    let result: string = '';

    if (keys.length) {
      result = '?';

      keys.forEach((key, i) => {
        if (params.hasOwnProperty(key)) {
          result += `${key}=${params[key]}${i < keys.length ? '&' : ''}`;
        }
      });
    }

    return result;
  }
}
