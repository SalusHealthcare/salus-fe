import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { CalendarModule } from 'angular-calendar';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [RemoteEntryComponent, CalendarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [
          {
            path: '',
            component: CalendarComponent,
          },
        ],
      },
    ]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useClass: NativeDateAdapter,
    }),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
  ],
  providers: [],
})
export class RemoteEntryModule {}
