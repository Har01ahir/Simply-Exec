import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {
  datePipe: DatePipe = new DatePipe('en-US');

  transform(date: Date, ...args: unknown[]): string | null {
    return this.datePipe.transform(date.toLocaleString(), 'dd-MM-yyyy HH:mm:ss');
  }

}
