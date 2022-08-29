import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Formello, ReserveFormConfig, ReserveFormModel } from '@salus/forms';
import { PatientService } from '@salus/graphql';

@Component({
  selector: 'salus-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.css'],
  providers: [ReserveFormModel],
})
export class ReserveDialogComponent {
  reserveForm: Formello<ReserveFormModel>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { reservationSlotId: string },
    private reserveFormModel: ReserveFormModel,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<ReserveDialogComponent>
  ) {
    this.reserveForm = new Formello(
      new ReserveFormConfig(this.reserveFormModel)
    );
  }

  reserve() {
    this.patientService
      .reserveSlot({
        reservationSlotId: this.data.reservationSlotId,
        description: this.reserveForm.getForm().get('description')?.value,
        priority: this.reserveForm.getForm().get('priority')?.value,
      })
      .subscribe((response) => {
        if (response.data?.reserve) {
          this.dialogRef.close(true);
        }
      });
  }
}
