import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myObjectValues' })

export class ValuesPipe implements PipeTransform {
  public transform(value, args: string[]): any[] {
    if (!(typeof value === 'object')) {
      return [];
    }

    let result: any[];

    Object.keys(value).forEach((key) => {
      if (value.hasOwnProperty(key)) {
        result.push(value[ key ]);
      }
    });

    return result;
  };
}
