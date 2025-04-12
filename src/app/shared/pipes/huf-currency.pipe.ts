import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hufCurrency',
  standalone: true
})
export class HufCurrencyPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined || value === '') return '';
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    return `${numericValue.toLocaleString('hu-HU')} Ft`;
  }
}
