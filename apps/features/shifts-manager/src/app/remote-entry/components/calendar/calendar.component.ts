import {
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IMedic, StaffService } from '@salus/graphql';
import { addDays, addHours } from 'date-fns';
import GSTC, {
  Config,
  GSTCResult,
  Chart,
} from 'gantt-schedule-timeline-calendar';
import { Plugin as CalendarScroll } from 'gantt-schedule-timeline-calendar/dist/plugins/calendar-scroll.esm.min.js';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js';
const date = GSTC.api.date; // dayjs function

@Component({
  selector: 'salus-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [
    './calendar.component.css',
    '../../../../../../../../node_modules/gantt-schedule-timeline-calendar/dist/style.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  @ViewChild('gstcElement', { static: true }) gstcElement!: ElementRef;
  gstc!: GSTCResult;
  licenseKey =
    '====BEGIN LICENSE KEY====\nW5K5b0JRLLSo8asIhd8MAaUrmHJLOotRmbz9xELDlHttJq7HCruwncM5W3dymkyth8vVh6UaNclcT92IXCxJD0RvSyA2zdX86yjF82ydHvQAMwh+ggeq0NS5AmDwS2KzIzVG7zE7zcbTwNTkISommmu6K6AS4+ivOUz75iI0+n0h+YsIkNZckhGwY7qboWIh9jpKv2nfBm02oEuFqqYRis9XYZ+TU+hX9qeFjbEdgxbLyjPL85tzneqNcnGYjPAXo4bhqlPaVC77NhzQjErCDB+s32ObEZtVFTIQrfirzR0+tGDzX25bZhmCaMhwHPHUq5at0e85i+wuhIYzXZX+5g==||U2FsdGVkX1+VTrfn/7JApQpGcmX9B03r+yHjvyW4oQh0jSbaHr5Eg6nU1f8EhiyVtDFlBcnrS4IhBbHfXaTwyprznqFWgQG9RSBeChDa5Xs=\njZxrY4CzLJnBIX0vU4615n00nt4vl78AsbD2grjC9Q+yRTW7iVK7ceqpIMXqdHejvp/1fBBoeohaKDFSl5BVVSGmIBIGaxlsoM6wVPTA/zJRl3zEtrEekV28jSW6XuBftPaKuF4K9fGrEJhFCJ5XsrZo7zPldgiyf4pkgJNYNe5feByFvI7cUZcOwYZK9mMR8Tpi3hyggvOj0G0LnjdBBsJxAO/2uONxPsZnTciNGn4CkbBn4Gt2ge1WrbuonmqeiYm0OVeOirTiUhG+HLyskzwboHZDdB0ETgey/sV8B0foi6NTRoseXrb56Rxr3erKFh85skRhCVscr4GvRW9Y7Q==\n====END LICENSE KEY====';

  startHour = date().set('hour', 8);
  endHour = date().set('hour', 21);
  hourSegment = 2;
  daysToShow = 7;

  minDate = date();
  maxDate = date().add(this.daysToShow, 'days');

  events: Chart['items'] = {};

  createDaysToView() {
    const days = [];
    for (let i = 0; i < this.daysToShow; i++) {
      const date = new Date();
      days.push(addDays(date, i));
    }
    return days;
  }

  createHoursSegments() {
    const segments = [];
    for (
      let i = this.startHour.hour();
      i < this.endHour.hour();
      i += 1 / this.hourSegment
    ) {
      segments.push(i);
    }
    return segments;
  }

  generateConfig(): Config {
    // GENERATE SOME ROWS
    const days = this.createDaysToView();

    const rows: any = {};
    for (let i = 0; i < days.length; i++) {
      const id = GSTC.api.GSTCID(days[i].toLocaleDateString());
      rows[id] = {
        id,
        label: days[i].toLocaleDateString(),
        expanded: true,
        visible: true,
      };
    }

    const items: any = {};
    // for (let i = 0; i < iterations; i++) {
    //   const id = GSTC.api.GSTCID(i.toString());
    //   start = start.add(1, 'day');
    //   items[id] = {
    //     id,
    //     label: 'User id ' + i,
    //     time: {
    //       start: start.valueOf(),
    //       end: start.add(1, 'day').valueOf(),
    //     },
    //     rowId: id,
    //   };
    // }

    // LEFT SIDE LIST COLUMNS

    const columns = {
      percent: 100,
      resizer: {
        inRealTime: true,
      },
      data: {
        [GSTC.api.GSTCID('label')]: {
          id: GSTC.api.GSTCID('label'),
          data: 'label',
          expander: true,
          isHtml: true,
          width: 128,
          minWidth: 100,
          header: {
            content: 'Room',
          },
        },
      },
    };
    return {
      licenseKey: this.licenseKey,
      list: {
        columns: {
          minWidth: 32,
          data: {
            [GSTC.api.GSTCID('label')]: {
              id: GSTC.api.GSTCID('label'),
              data: 'label',
              width: 128,
              header: {
                content: 'Day',
              },
            },
          },
        },
        row: {
          gap: { top: 0, bottom: 0 },
          height: 68,
        },
        rows: rows,
      },
      chart: {
        item: {
          height: 50,
          minWidth: 128,
          overlap: false,
        },
        items: {
          // [GSTC.api.GSTCID('0')]: {
          //   id: GSTC.api.GSTCID('0'),
          //   rowId: GSTC.api.GSTCID('1'),
          //   label: 'Mario Rossi',
          //   time: {
          //     start: date('2022-08-22T08:00:00').valueOf(),
          //     end: date('2022-08-22T12:00:00').valueOf(),
          //   },
          // },
          // [GSTC.api.GSTCID('1')]: {
          //   id: GSTC.api.GSTCID('1'),
          //   rowId: GSTC.api.GSTCID('1'),
          //   label: 'Francesco Rossi',
          //   time: {
          //     start: date('2022-08-22T08:00').valueOf(),
          //     end: date('2022-08-22T16:00').valueOf(),
          //   },
          // },
        },
        time: {
          zoom: 14,
          from: this.startHour.startOf('hour').valueOf(), // from 2020-01-01
          to: this.endHour.valueOf(), // to 2020-01-31
          period: 'hour',
          autoExpandTimeFromItems: true,
          onLevelDates: [
            ({ dates }) => {
              return dates.filter(
                (dateChart) =>
                  dateChart.rightGlobal &&
                  dateChart.leftGlobal &&
                  dateChart.leftGlobalDate.hour() >= this.startHour.hour() &&
                  dateChart.rightGlobalDate.hour() < this.endHour.hour() &&
                  dateChart.rightGlobalDate.minute() &&
                  dateChart.leftGlobalDate.date() == this.startHour.date()
              );
            },
          ],
        },
        calendarLevels: [
          [
            {
              zoomTo: 14,
              period: 'minute',
              periodIncrement: 30,
              main: true,
              format({ timeStart }) {
                return timeStart.format('HH:mm');
              },
            },
          ],
        ],
      },
      plugins: [
        CalendarScroll(),
        TimelinePointer(),
        Selection(),
        ItemResizing({
          ignoreMissingDates: true,
          allowItemsToGoOutsideTheArea: false,
          threshold: 0.5,
        }),
        ItemMovement({
          ignoreMissingDates: true,
          allowItemsToGoOutsideTheArea: false,
          threshold: {
            horizontal: 0.5,
          },
        }),
      ],
    };
  }

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    const state = GSTC.api.stateFromConfig(this.generateConfig());
    console.log(this.generateConfig());

    (globalThis as any).state = state;
    this.gstc = GSTC({
      element: this.gstcElement.nativeElement,
      state,
    });
    (globalThis as any).gstc = this.gstc;

    this.staffService
      .getShifts({
        page: 0,
        size: 100,
        startDate: this.minDate.toDate(),
        endDate: this.maxDate.toDate(),
      })
      .valueChanges.subscribe((response) => {
        console.log(response);
        const staffsData = response.data.allPeople;
        if (staffsData) {
          staffsData.forEach((staff) => {
            staff.shiftSlots.forEach((shift) => {
              const content = `${
                staff.__typename === 'Medic'
                  ? (staff as IMedic).speciality
                  : staff.__typename
              }`;
              if (this.events)
                this.events[
                  GSTC.api.GSTCID(
                    this.createDaysToView()[1].toLocaleDateString() +
                      '-' +
                      shift.id
                  )
                ] = {
                  id: GSTC.api.GSTCID(
                    this.createDaysToView()[1].toLocaleDateString() +
                      '-' +
                      shift.id
                  ),
                  rowId: GSTC.api.GSTCID(
                    this.createDaysToView()[1].toLocaleDateString()
                  ),
                  label: `${staff.lastName} ${staff.firstName} --- ${content}`,
                  time: {
                    start: date('2022-08-22T08:00').valueOf(),
                    end: date('2022-08-22T16:00').valueOf(),
                  },
                };
            });
          });
          this.gstc.state.update('config.chart.items', this.events);
        }
      });
    console.log('init');
  }
}
