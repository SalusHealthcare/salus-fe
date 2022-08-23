import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { StaffService } from '@salus/graphql';
import { FormelloField } from '../lib/formello/FormelloField';
import { IFormelloConfig } from '../lib/models/interfaces/IFormelloConfig.interface';
import { FormelloFieldTypes } from '../lib/models/interfaces/IFormelloField.interface';
import { IFormelloRow } from '../lib/models/interfaces/IFormelloRow.interface';

const durationHourItem = (value: number, viewValue: string) => ({
  value,
  viewValue,
});

const durationInHoursList = () => {
  const list = [];
  for (let i = 0.5; i <= 12; i += 0.5) {
    list.push(durationHourItem(i, `${i.toString()} hours`));
  }
  return list;
};

@Injectable()
export class ShiftFormModel {
  id = new FormelloField('id', 'Id', '', FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);
  personId = new FormelloField(
    'personId',
    'Staff/Medic',
    '',
    FormelloFieldTypes.SELECT,
    [Validators.required]
  );
  startDate = new FormelloField(
    'startDate',
    'Start Date',
    new Date(),
    FormelloFieldTypes.DATE,
    [Validators.required]
  );
  startTime = new FormelloField(
    'startTime',
    'Start Time',
    '08:00',
    FormelloFieldTypes.TIME,
    [Validators.required]
  );
  durationInHours = new FormelloField<number>(
    'durationInHours',
    'Duration',
    1,
    FormelloFieldTypes.SELECT,
    [Validators.required],
    durationInHoursList()
  );

  constructor(private staffService: StaffService) {
    this.staffService.getAllStaffsForSelect().subscribe((response) => {
      if (response.data.allPeople) {
        this.personId.options = response.data.allPeople.map((person) => {
          return {
            value: person.id,
            viewValue: `${person.firstName} ${person.lastName}`,
          };
        });
      }
    });
  }
}

export class AddShiftFormConfig implements IFormelloConfig<ShiftFormModel> {
  model: ShiftFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: ShiftFormModel) {
    this.model = model;
    this.rows = [
      {
        fields: [this.model.personId],
      },
      {
        fields: [
          this.model.startDate,
          this.model.startTime,
          this.model.durationInHours,
        ],
      },
    ];
  }
}
