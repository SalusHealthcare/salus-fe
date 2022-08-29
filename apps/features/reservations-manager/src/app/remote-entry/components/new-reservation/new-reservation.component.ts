import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  Formello,
  NewReservationFilterFormConfig,
  NewReservationFilterFormModel,
} from '@salus/forms';
import { IReservationSlot, PatientService } from '@salus/graphql';
import GSTC from 'gantt-schedule-timeline-calendar';
import { ReserveDialogComponent } from '../reserve-dialog/reserve-dialog.component';
const date = GSTC.api.date; // dayjs function

@Component({
  selector: 'salus-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css'],
  providers: [NewReservationFilterFormModel],
})
export class NewReservationComponent implements OnInit {
  displayedColumns = [
    'startDateTime',
    'durationInHours',
    'speciality',
    'medic',
    'actions',
  ];

  dataSource: MatTableDataSource<IReservationSlot> = new MatTableDataSource();
  startDate = date().format('YYYY-MM-DDTHH:mm:ss');
  endDate = date().add(1, 'month').format('YYYY-MM-DDTHH:mm:ss');

  reservationFilterForm: Formello<NewReservationFilterFormModel>;

  constructor(
    private patientService: PatientService,
    private reservationFilterFormModel: NewReservationFilterFormModel,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.reservationFilterForm = new Formello(
      new NewReservationFilterFormConfig(this.reservationFilterFormModel)
    );
  }

  ngOnInit(): void {
    this.getAvailableReservations();
    this.reservationFilterForm
      .valueChanges()
      .subscribe(() => this.getAvailableReservations());
  }

  getAvailableReservations() {
    this.patientService
      .getAvailabeReservationSlots({
        startDate: this.startDate,
        endDate: this.endDate,
        speciality: this.reservationFilterFormModel.speciality.control.value,
      })
      .subscribe((result) => {
        if (result.data.availableReservationSlots) {
          const sortedData = [...result.data.availableReservationSlots];
          sortedData.sort((a, b) => {
            return date(a.startDateTime.iso).valueOf() >
              date(b.startDateTime.iso).valueOf()
              ? 1
              : -1;
          });
          this.dataSource = new MatTableDataSource(sortedData);
        }
      });
  }

  openReservationDialog(row: IReservationSlot) {
    const dialogRef = this.dialog.open(ReserveDialogComponent, {
      minWidth: '50%',
      data: {
        reservationSlotId: row.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['app', 'reservations']);
      }
    });
  }
}
