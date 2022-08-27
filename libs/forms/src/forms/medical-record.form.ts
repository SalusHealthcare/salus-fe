import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MedicalDocumentType } from '@salus/graphql';
import { FormelloField } from '../lib/formello/FormelloField';
import { IFormelloConfig } from '../lib/models/interfaces/IFormelloConfig.interface';
import {
  FormelloFieldTypes,
  IFormelloFieldOption,
} from '../lib/models/interfaces/IFormelloField.interface';
import { IFormelloRow } from '../lib/models/interfaces/IFormelloRow.interface';

const documentTypeSelectOptions: IFormelloFieldOption[] = [
  {
    value: MedicalDocumentType.DIAGNOSTIC,
    viewValue: MedicalDocumentType.DIAGNOSTIC,
  },
  {
    value: MedicalDocumentType.REPORT,
    viewValue: MedicalDocumentType.REPORT,
  },
  {
    value: MedicalDocumentType.LABORATORY_ANALYSIS,
    viewValue: MedicalDocumentType.LABORATORY_ANALYSIS,
  },
  {
    value: MedicalDocumentType.PRESCRIPTION,
    viewValue: MedicalDocumentType.PRESCRIPTION,
  },
];

@Injectable()
export class MedicalRecordFormModel {
  id = new FormelloField('id', 'Id', '', FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);
  patientId = new FormelloField(
    'patientId',
    'Patient',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  description = new FormelloField(
    'description',
    'Description',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  documentType = new FormelloField(
    'documentType',
    'Document Type',
    '',
    FormelloFieldTypes.SELECT,
    [Validators.required],
    documentTypeSelectOptions
  );

  constructor() {
    this.description.cssClasses = 'w-full';
  }
}

export class AddMedicalRecordFormConfig
  implements IFormelloConfig<MedicalRecordFormModel>
{
  model: MedicalRecordFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: MedicalRecordFormModel) {
    this.model = model;
    this.rows = [
      {
        fields: [this.model.description],
      },
      {
        fields: [this.model.documentType],
      },
    ];
  }
}
