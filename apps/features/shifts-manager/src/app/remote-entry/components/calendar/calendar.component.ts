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
  CommonService,
  IGetSelfShiftsResponse,
  IGetShiftsResponse,
  IMedic,
  ITimeSlot,
  IWorker,
  StaffService,
  UserRole,
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
import {
  delay,
  EMPTY,
  first,
  forkJoin,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { RoleService } from '@salus/helpers';
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
  @Input() updateSubject: Observable<boolean> | undefined;

  startHour = date().set('hour', 8).startOf('hour');
  endHour = date().set('hour', 21).endOf('hour');
  hourSegment = 2;
  daysToShow = 7;

  minDate = date().startOf('day');
  maxDate = date()
    .add(this.daysToShow - 1, 'days')
    .endOf('day');

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
        // Selection(),
        // ItemResizing({
        //   ignoreMissingDates: true,
        //   allowItemsToGoOutsideTheArea: false,
        //   threshold: 0.5,
        // }),
        // ItemMovement({
        //   ignoreMissingDates: true,
        //   allowItemsToGoOutsideTheArea: false,
        //   threshold: {
        //     horizontal: 0.5,
        //   },
        // }),
      ],
    };
  }

  constructor(
    private roleService: RoleService,
    private staffService: StaffService,
    private commonService: CommonService
  ) {}

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
      this.minDate = date(newDate).startOf('day');
      this.maxDate = date(newDate)
        .add(this.daysToShow - 1, 'days')
        .endOf('day');
      this.updateChartWeek();
    });

    this.updateSubject
      ? this.updateSubject
          .pipe(delay(3000), tap(console.log))
          .subscribe((res) => {
            if (res) {
              this.getShifts();
            }
          })
      : null;
  }

  getShifts() {
    forkJoin([
      this.roleService.hasRole([UserRole.ADMIN]).pipe(first()),
      this.roleService.hasRole([UserRole.MEDIC, UserRole.STAFF]).pipe(first()),
    ])
      .pipe(
        switchMap(([isAdmin, isStaff]) => {
          console.log({ isAdmin, isStaff });
          if (isAdmin) {
            return this.staffService.getShifts({
              page: 0,
              size: 100,
              startDate: this.minDate.toDate(),
              endDate: this.maxDate.toDate(),
            });
          } else if (isStaff) {
            return this.staffService.getSelfShifts({
              startDate: this.minDate.toDate(),
              endDate: this.maxDate.toDate(),
            });
          } else {
            return EMPTY;
          }
        }),
        tap(console.log),
        first()
      )
      .subscribe((response) => {
        this.events = {};
        if (response) {
          const staffsData = (response.data as any)['currentUser']
            ? [(response.data as IGetSelfShiftsResponse).currentUser.person]
            : (response.data as IGetShiftsResponse).allPeople;
          staffsData.forEach((staff) => {
            this.shiftSlotsToEvents(staff);
            if (staff.__typename === 'Medic') {
              this.reservationSlotsToEvents(staff as IMedic);
            }
          });
          this.gstc.state.update('config.chart.items', this.events);
        }
      });
  }

  shiftSlotsToEvents(staff: IWorker) {
    staff.shiftSlots.forEach((shift) => {
      const content = `${staff.lastName} ${staff.firstName} - ${
        staff.__typename === 'Medic'
          ? (staff as IMedic).speciality
          : staff.__typename
      }`;
      if (this.events)
        this.events[
          GSTC.api.GSTCID(
            `${this.createChartItemIdBasedOnDateString(shift)}-${shift.id}`
          )
        ] = this.createChartItemFromSlot(staff, shift, content, {
          background: 'blue',
        });
    });
  }

  reservationSlotsToEvents(medic: IMedic) {
    medic.reservationSlots.forEach((reservation) => {
      const content = `Res. - Booked: ${reservation.booked}`;
      if (this.events)
        this.events[
          GSTC.api.GSTCID(
            `${this.createChartItemIdBasedOnDateString(reservation)}-${
              reservation.id
            }`
          )
        ] = this.createChartItemFromSlot(medic, reservation, content, {
          background: 'green',
        });
    });
  }

  createChartItemIdBasedOnDateString(shift: ITimeSlot): string {
    return date(shift.startDateTime.iso).toDate().toLocaleDateString();
  }

  // Set the start time based on the gantt time grid (always setted to today)
  mapShiftDateToChartTimeGrid(slot: ITimeSlot) {
    return date(slot.startDateTime.iso)
      .set('year', this.startHour.year())
      .set('month', this.startHour.month())
      .set('date', this.startHour.date());
  }

  createChartItemFromSlot(
    staff: IWorker,
    slot: ITimeSlot,
    content: string,
    styles: Record<string, unknown>
  ) {
    const startTime = this.mapShiftDateToChartTimeGrid(slot);
    const endTime = this.mapShiftDateToChartTimeGrid(slot).add(
      slot.durationInHours,
      'hours'
    );

    return {
      id: GSTC.api.GSTCID(
        `${this.createChartItemIdBasedOnDateString(slot)}-${slot.id}`
      ),
      rowId: GSTC.api.GSTCID(this.createChartItemIdBasedOnDateString(slot)),
      label: content,
      time: {
        start: startTime.valueOf(),
        end: endTime.valueOf(),
      },
      styles: styles,
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
