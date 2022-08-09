import { Injectable, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { MedicalSpeciality } from '@salus/graphql';
import { FormelloField } from '../lib/formello/FormelloField';
import { IFormelloConfig } from '../lib/models/interfaces/IFormelloConfig.interface';
import {
  FormelloFieldTypes,
  IFormelloFieldOption,
} from '../lib/models/interfaces/IFormelloField.interface';
import { IFormelloRow } from '../lib/models/interfaces/IFormelloRow.interface';

const PersonTypes: IFormelloFieldOption[] = [
  {
    value: 'medic',
    viewValue: 'Medic',
  },
  {
    value: 'staff',
    viewValue: 'Staff',
  },
  {
    value: 'patient',
    viewValue: 'Patient',
  },
];

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
export class PersonFormModel {
  // Readonly fields
  id = new FormelloField('id', 'Id', '', FormelloFieldTypes.TEXT);
  type = new FormelloField(
    'type',
    'Type',
    'staff',
    FormelloFieldTypes.SELECT,
    [],
    PersonTypes
  );
  // Visible fields
  firstName = new FormelloField(
    'firstName',
    'Firstname',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  lastName = new FormelloField(
    'lastName',
    'Lastname',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  email = new FormelloField('email', 'Email', '', FormelloFieldTypes.TEXT, [
    Validators.required,
    Validators.email,
  ]);

  password = new FormelloField(
    'password',
    'Password',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );

  taxCode = new FormelloField(
    'taxCode',
    'Tax code',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  birthDate = new FormelloField(
    'birthDate',
    'Birthdate',
    '',
    FormelloFieldTypes.DATE,
    [Validators.required]
  );
  telephoneNumber = new FormelloField(
    'telephoneNumber',
    'Phone',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  roles = new FormelloField('roles', 'Roles', '', FormelloFieldTypes.SELECT, [
    Validators.required,
  ]);

  medicalSpeciality = new FormelloField<MedicalSpeciality>(
    'medicalSpeciality',
    'Medical Speciality',
    MedicalSpeciality.GENERAL_PRACTICE,
    FormelloFieldTypes.SELECT,
    [Validators.required],
    medicalSpeciality
  );
}

export class PersonFormConfigStaff implements IFormelloConfig<PersonFormModel> {
  model: PersonFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: PersonFormModel) {
    this.model = model;
    this.model.type.options = this.model.type.options.slice(0, 2);
    this.rows = [
      {
        fields: [this.model.type, this.model.email, this.model.password],
      },
      {
        fields: [this.model.firstName, this.model.lastName],
      },
      {
        fields: [
          this.model.taxCode,
          this.model.birthDate,
          this.model.telephoneNumber,
        ],
      },
    ];
  }
}

export class PersonFormConfigMedic implements IFormelloConfig<PersonFormModel> {
  model: PersonFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: PersonFormModel) {
    this.model = model;
    this.model.type.options = this.model.type.options.slice(0, 2);
    this.rows = [
      {
        fields: [this.model.type, this.model.email, this.model.password],
      },
      {
        fields: [this.model.firstName, this.model.lastName],
      },
      {
        fields: [
          this.model.taxCode,
          this.model.birthDate,
          this.model.telephoneNumber,
        ],
      },
      {
        fields: [this.model.medicalSpeciality],
      },
    ];
  }
}
