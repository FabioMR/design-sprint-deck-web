import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {
  constructor (
    private decimalPipe: DecimalPipe,
  ) {}

  transform(value: any, singular: string, plural: string, showValue = true): string {
    if (!value && value !== 0) {
      return null;
    }

    return [
      showValue && this.decimalPipe.transform(value, '1.0-0'),
      value === 1 ? singular : plural
    ].filter(item => !!item).join(' ');
  }
}
