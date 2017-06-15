import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myToFixed' })

export class ToFixedPipe implements PipeTransform {
  public transform(value: number, args: number): string {
    return value.toFixed(args);
  };
}
