import { Injectable } from '@angular/core';

@Injectable()

export class LocalstorageService {
  private localStorage: Storage = window.localStorage;

  public setValue(key: string, value: string): string {
    this.localStorage.setItem(key, value);
    return this.localStorage[key];
  };

  public setValueIfUndefined(key: string, value: string): string {
    if (!this.localStorage[key]) {
      this.localStorage.setItem(key, value);
    }

    return this.localStorage[key];
  };

  public getValue(key: string): string {
    return this.localStorage[key];
  };

  public deleteValue(key: string): boolean {
    if (this.isExists(key)) {
      this.localStorage.removeItem(key);
      return true;
    } else {
      return false;
    }
  };

  public isExists(key: string): boolean {
    return !!this.localStorage[key];
  };
}
