import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availability',
  standalone: true
})
export class AvailabilityPipe implements PipeTransform {
  /**
   * Transforms a boolean availability into a user-friendly label
   * @param value true if available, false otherwise
   * @returns "✅ Available" or "❌ Not Available"
   */
  transform(value: boolean): string {
    return value ? '✅ Available' : '❌ Not Available';
  }
}
