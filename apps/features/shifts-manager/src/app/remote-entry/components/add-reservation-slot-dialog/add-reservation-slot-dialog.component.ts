import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  AddReservationSlotFormConfig,
  Formello,
  ReservationSlotFormModel,
} from '@salus/forms';
import { StaffService } from '@salus/graphql';
import GSTC from 'gantt-schedule-timeline-calendar';
const date = GSTC.api.date; // dayjs function

@Component({
  selector: 'salus-add-reservation-slot-dialog',
  templateUrl: './add-reservation-slot-dialog.component.html',
  styleUrls: ['./add-reservation-slot-dialog.component.css'],
  providers: [ReservationSlotFormModel],
})
export class AddReservationSlotDialogComponent {
  reservationSlotForm: Formello<ReservationSlotFormModel>;

  constructor(
    private dialogRef: MatDialogRef<AddReservationSlotDialogComponent>,
    private reservationSlotFormModel: ReservationSlotFormModel,
    private staffService: StaffService
  ) {
    this.reservationSlotForm = new Formello<ReservationSlotFormModel>(
      new AddReservationSlotFormConfig(this.reservationSlotFormModel)
    );
  }

  add() {
    this.reservationSlotForm.getForm().updateValueAndValidity();
    console.log(this.reservationSlotForm.getForm().value);

    const props = {
      startDateTime: date(this.reservationSlotForm.getForm().value.startDate)
        .set(
          'hours',
          this.reservationSlotForm.getForm().value.startTime.split(':')[0]
        )
        .set(
          'minutes',
          this.reservationSlotForm.getForm().value.startTime.split(':')[1]
        )
        .format('YYYY-MM-DDTHH:mm:ss'),
      durationInHours: this.reservationSlotForm.getForm().value.durationInHours,
    };
    console.log(props);

    this.staffService.addReservationSlot(props).subscribe((response) => {
      if (response.data?.addReservationSlots) {
        this.dialogRef.close(true);
      }
    });
  }
}
