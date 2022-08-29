import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AddMedicalRecordFormConfig,
  Formello,
  MedicalRecordFormModel,
} from '@salus/forms';
import { MedicalRecordService } from '@salus/graphql';

@Component({
  selector: 'salus-add-record-dialog',
  templateUrl: './add-record-dialog.component.html',
  styleUrls: ['./add-record-dialog.component.css'],
  providers: [MedicalRecordFormModel],
})
export class AddRecordDialogComponent {
  medicalRecordForm: Formello<MedicalRecordFormModel>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string },
    private medicalRecordFormModel: MedicalRecordFormModel,
    private medicalRecordService: MedicalRecordService,
    private dialogRef: MatDialogRef<AddRecordDialogComponent>
  ) {
    this.medicalRecordForm = new Formello<MedicalRecordFormModel>(
      new AddMedicalRecordFormConfig(this.medicalRecordFormModel)
    );
  }

  add() {
    this.medicalRecordService
      .insertRecord({
        patientId: this.data.patientId,
        ...this.medicalRecordForm.getForm().value,
      })
      .subscribe((response) => {
        if (response.data?.insertDocuments) {
          this.dialogRef.close(true);
        }
        console.log('add');
      });
  }
}
