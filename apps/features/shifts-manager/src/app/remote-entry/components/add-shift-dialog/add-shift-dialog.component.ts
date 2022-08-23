import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddShiftFormConfig, Formello, ShiftFormModel } from '@salus/forms';
import { StaffService } from '@salus/graphql';
import GSTC from 'gantt-schedule-timeline-calendar';
const date = GSTC.api.date; // dayjs function

@Component({
  selector: 'salus-add-shift-dialog',
  templateUrl: './add-shift-dialog.component.html',
  styleUrls: ['./add-shift-dialog.component.css'],
  providers: [ShiftFormModel],
})
export class AddShiftDialogComponent implements OnInit {
  shiftForm: Formello<ShiftFormModel>;

  constructor(
    private dialogRef: MatDialogRef<AddShiftDialogComponent>,
    private shiftFormModel: ShiftFormModel,
    private staffService: StaffService
  ) {
    this.shiftForm = new Formello(new AddShiftFormConfig(this.shiftFormModel));
  }

  ngOnInit(): void {}

  add(): void {
    this.shiftForm.getForm().updateValueAndValidity();
    console.log(this.shiftForm.getForm().value);

    const props = {
      personId: this.shiftForm.getForm().value.personId,
      startDateTime: date(this.shiftForm.getForm().value.startDate)
        .set('hours', this.shiftForm.getForm().value.startTime.split(':')[0])
        .set('minutes', this.shiftForm.getForm().value.startTime.split(':')[1])
        .format('YYYY-MM-DDTHH:mm:ss'),
      durationInHours: this.shiftForm.getForm().value.durationInHours,
    };
    console.log(props);

    this.staffService.addShift(props).subscribe((response) => {
      if (response.data?.addShifts) {
        this.dialogRef.close(true);
      }
    });
  }
}
