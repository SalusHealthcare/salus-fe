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
  for (let i = 1; i <= 12; i += 1) {
    list.push(durationHourItem(i, `${i.toString()} hours`));
  }
  return list;
};

@Injectable()
export class ReservationSlotFormModel {
  id = new FormelloField('id', 'Id', '', FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);
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
}

export class AddReservationSlotFormConfig
  implements IFormelloConfig<ReservationSlotFormModel>
{
  model: ReservationSlotFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: ReservationSlotFormModel) {
    this.model = model;
    this.rows = [
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
