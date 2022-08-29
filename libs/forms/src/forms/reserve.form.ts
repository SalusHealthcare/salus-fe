import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Priority } from '@salus/graphql';
import { FormelloField } from '..';
import { IFormelloConfig } from '../lib/models/interfaces/IFormelloConfig.interface';
import {
  IFormelloFieldOption,
  FormelloFieldTypes,
} from '../lib/models/interfaces/IFormelloField.interface';
import { IFormelloRow } from '../lib/models/interfaces/IFormelloRow.interface';

const priorityOptions: IFormelloFieldOption<Priority>[] = [
  {
    value: Priority.WHITE,
    viewValue: 'White',
  },
  {
    value: Priority.GREEN,
    viewValue: 'Green',
  },
  {
    value: Priority.YELLOW,
    viewValue: 'Yellow',
  },
  {
    value: Priority.RED,
    viewValue: 'Red',
  },
];

@Injectable()
export class ReserveFormModel {
  reservationSlotId = new FormelloField(
    'reservationSlotId',
    'Slot Id',
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

  priority = new FormelloField<Priority>(
    'priority',
    'Priority',
    priorityOptions[0].value,
    FormelloFieldTypes.SELECT,
    [Validators.required],
    priorityOptions
  );

  constructor() {
    this.description.cssClasses = 'w-full';
  }
}

export class ReserveFormConfig implements IFormelloConfig<ReserveFormModel> {
  model: ReserveFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: ReserveFormModel) {
    this.model = model;
    this.rows = [
      {
        fields: [this.model.description],
      },
      {
        fields: [this.model.priority],
      },
    ];
  }
}
