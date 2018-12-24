import { Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ElementRef} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { FullCalendarModule} from 'primeng/fullcalendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { FilterPipe } from 'ngx-filter-pipe';
import { Driver } from '../app/driver';
import { Car } from './car';
import { Calendar } from './Cal';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
interface MyEvent extends CalendarEvent {
Sname: string;
Dname: string;
Cname: string;
}
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
     title = 'calendar';
ev: Calendar[] = [];
event2: MyEvent = {Dname: '',
Sname: ' ',
Cname: '',
title: '',
start: startOfDay(new Date()),
end: endOfDay(new Date())
};
events2: MyEvent[] = [];
carfilter: any = { name: '' };
word: string[];
  searchText: string;
start = startOfDay(new Date());
end = endOfDay(new Date());
color = colors.red;
  public _opened = false;
    public _opened2 = false;

  studentName: string;

  driveSelected: string;
  carSelected: string;
  driver: Driver[];
  car: Car[];
@ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
constructor(public filterPipe: FilterPipe, private modal: NgbModal) {
    console.log(filterPipe.transform(this.car, { name: 'M'}));
  }
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: MyEvent }): void => {
        this.handleEvent('Edited', event);
    this.event2 = event;

      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: MyEvent }): void => {
        this.events2 = this.events2.filter(iEvent => iEvent !== event);

      }
    }
  ];
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
  ];

  activeDayIsOpen = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
getEvents () {
  return this.events2.filter(
     (eventOb) => {
       return eventOb.title.toLowerCase().indexOf(this.carfilter.name.toLowerCase()) !== -1;
     }
  );
}
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events2.push({
      Dname: this.driveSelected,
      Cname: this.carSelected,
      Sname: this.studentName,
      title: 'Driver Name :' + this.driveSelected  + '\n' + 'Car Name :' + this.carSelected + '\n' + 'Student Name :' + this.studentName,
      start: this.start,
      end: this.end,
      color: this.color,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.events.push({
      title: 'Driver Name :' + this.driveSelected  + '\n' + 'Car Name :' + this.carSelected + '\n' + 'Student Name :' + this.studentName,
      start: this.start,
      end: this.end,
      color: this.color,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();

  }
 ngOnInit() {

this.driver = [{name: 'ahmed'},
{name: 'raed'},
{name: 'nabeel'},
{name: 'mohamed'},
{name: 'sami'}, ];
this.driveSelected = 'ahmed';
this.car = [{name: 'BMW'},
{name: 'GOLF ahmed raed'},
{name: 'PASSAT'},
{name: 'GETTA'},
{name: 'OCTAVIA'}, ];
this.carSelected = 'PASSAT';
  }
   public _toggleSidebar() {
    this._opened = !this._opened;
  }
  _toggleSidebar2() {
        this._opened2 = !this._opened2;

  }

   eventClicked({ event }: { event: CalendarEvent }) {
    console.log('Event clicked', event);
    return event;

  }

  getevent () {
 return this.event2;
  }
}
