import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myObjectKeys' })

export class KeysPipe implements PipeTransform {
  public transform(value, args: string[]): any[] {
    if (!(typeof value === 'object')) {
      return [];
    }
    return Object.keys(value);
  };
}
