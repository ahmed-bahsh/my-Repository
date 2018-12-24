import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { MyEvent} from './MyEvent';
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class
  month(event: MyEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      event.Dname,
      this.locale
    )}</b> ${event.title}`;
  }

  week(event: MyEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
       event.Sname,
      this.locale
    )}</b> ${event.title}`;
  }

  day(event: MyEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
        event.Dname,
      this.locale
    )}</b> ${event.title}`;
  }
}
