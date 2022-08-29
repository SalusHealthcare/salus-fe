import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { MedicalSpeciality } from '@salus/graphql';
import { FormelloField } from '..';
import { IFormelloConfig } from '../lib/models/interfaces/IFormelloConfig.interface';
import {
  IFormelloFieldOption,
  FormelloFieldTypes,
} from '../lib/models/interfaces/IFormelloField.interface';
import { IFormelloRow } from '../lib/models/interfaces/IFormelloRow.interface';

const medicalSpeciality: IFormelloFieldOption<MedicalSpeciality>[] = [
  {
    value: MedicalSpeciality.GENERAL_PRACTICE,
    viewValue: 'General Practice',
  },
  {
    value: MedicalSpeciality.EMERGENCY_MEDICINE,
    viewValue: 'Emergency Medicine',
  },
  {
    value: MedicalSpeciality.DERMATOLOGY,
    viewValue: 'Dermatology',
  },
  {
    value: MedicalSpeciality.ONCOLOGY,
    viewValue: 'Oncology',
  },
  {
    value: MedicalSpeciality.OPHTHALMOLOGY,
    viewValue: 'Ophthalmology',
  },
  {
    value: MedicalSpeciality.RADIOLOGY,
    viewValue: 'Radiology',
  },
  {
    value: MedicalSpeciality.SPORTS_MEDICINE_AND_REHABILITATION,
    viewValue: 'Sports Medicine and Rehabilitation',
  },
];

@Injectable()
export class NewReservationFilterFormModel {
  medicId = new FormelloField('medicId', 'Medic', '', FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);
  speciality = new FormelloField<MedicalSpeciality>(
    'speciality',
    'Speciality',
    medicalSpeciality[0].value,
    FormelloFieldTypes.SELECT,
    [Validators.required],
    medicalSpeciality
  );
}

export class NewReservationFilterFormConfig
  implements IFormelloConfig<NewReservationFilterFormModel>
{
  model: NewReservationFilterFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: NewReservationFilterFormModel) {
    this.model = model;
    this.rows = [
      {
        fields: [this.model.speciality],
      },
    ];
  }
}
