import {
  Component,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  IGetShiftsResponse,
  IMedic,
  ITimeSlot,
  IWorker,
  StaffService,
} from '@salus/graphql';
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
import { FormControl } from '@angular/forms';
import { QueryRef } from 'apollo-angular';
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

  @Input() startWeekDate: FormControl | undefined;

  startHour = date().set('hour', 8);
  endHour = date().set('hour', 21);
  hourSegment = 2;
  daysToShow = 7;

  minDate = date();
  maxDate = date().add(this.daysToShow, 'days');

  events: Chart['items'] = {};
  getShiftsQueryRef: QueryRef<IGetShiftsResponse> | undefined;

  createDaysToView() {
    const days = [];
    for (let i = 0; i < this.daysToShow; i++) {
      days.push(addDays(this.minDate.toDate(), i));
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
    // LEFT SIDE LIST COLUMNS
    const columns = {
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
    };

    return {
      licenseKey: this.licenseKey,
      list: {
        columns,
        row: {
          gap: { top: 0, bottom: 0 },
          height: 68,
        },
        rows: this.generateChartRows(),
      },
      chart: {
        item: {
          height: 50,
          minWidth: 128,
          overlap: false,
        },
        time: {
          zoom: 14,
          from: this.startHour.startOf('hour').valueOf(),
          to: this.endHour.valueOf(),
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

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    const state = GSTC.api.stateFromConfig(this.generateConfig());
    (globalThis as any).state = state;
    this.gstc = GSTC({
      element: this.gstcElement.nativeElement,
      state,
    });
    (globalThis as any).gstc = this.gstc;

    this.getShifts();

    this.startWeekDate?.valueChanges.subscribe((newDate) => {
      this.minDate = date(newDate);
      this.maxDate = date(newDate).add(this.daysToShow, 'days');
      this.updateChartWeek();
    });
  }

  getShifts() {
    this.staffService
      .getShifts({
        page: 0,
        size: 100,
        startDate: this.minDate.toDate(),
        endDate: this.maxDate.toDate(),
      })
      .subscribe((response) => {
        console.log(response);
        const staffsData = response.data.allPeople;
        if (staffsData) {
          this.events = {};
          staffsData.forEach((staff) => {
            staff.shiftSlots.forEach((shift) => {
              if (this.events)
                this.events[
                  GSTC.api.GSTCID(
                    `${this.createChartItemIdBasedOnDateString(shift)}-${
                      shift.id
                    }`
                  )
                ] = this.createChartItemFromShift(staff, shift);
            });
          });
          this.gstc.state.update('config.chart.items', this.events);
        }
      });
  }

  createChartItemIdBasedOnDateString(shift: ITimeSlot): string {
    return date(shift.startDateTime.iso).toDate().toLocaleDateString();
  }

  // Set the start time based on the gantt time grid (always setted to today)
  mapShiftDateToChartTimeGrid(shift: ITimeSlot) {
    return date(shift.startDateTime.iso)
      .set('year', this.startHour.year())
      .set('month', this.startHour.month())
      .set('day', this.startHour.day());
  }

  createChartItemFromShift(staff: IWorker, shift: ITimeSlot) {
    const content = `${
      staff.__typename === 'Medic'
        ? (staff as IMedic).speciality
        : staff.__typename
    }`;

    const startTime = this.mapShiftDateToChartTimeGrid(shift);
    const endTime = this.mapShiftDateToChartTimeGrid(shift).add(
      shift.durationInHours,
      'hours'
    );

    return {
      id: GSTC.api.GSTCID(
        `${this.createChartItemIdBasedOnDateString(shift)}-${shift.id}`
      ),
      rowId: GSTC.api.GSTCID(this.createChartItemIdBasedOnDateString(shift)),
      label: `${staff.lastName} ${staff.firstName} - ${content}`,
      time: {
        start: startTime.valueOf(),
        end: endTime.valueOf(),
      },
    };
  }

  generateChartRows() {
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
    return rows;
  }

  async updateChartWeek() {
    this.gstc.state.update('config.chart.items', {});
    this.gstc.state.update('config.list.rows', this.generateChartRows());
    this.getShifts();
  }
}
