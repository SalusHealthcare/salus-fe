import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  FormelloField,
  FormelloFieldTypes,
  IFormelloConfig,
  IFormelloRow,
} from 'formello';

@Injectable()
export class StructureFormModel {
  name = new FormelloField('name', 'Name', null, FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);

  address = new FormelloField(
    'address',
    'Address',
    null,
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );

  city = new FormelloField('city', 'City', null, FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);

  postalCode = new FormelloField(
    'postalCode',
    'Postal Code',
    null,
    FormelloFieldTypes.TEXT,
    [Validators.required, Validators.min(5), Validators.max(5)]
  );
}

export class StructureFormConfiguration
  implements IFormelloConfig<StructureFormModel>
{
  model: StructureFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: StructureFormModel) {
    this.model = model;
    this.rows = [
      { fields: [this.model.name] },
      { fields: [this.model.address, this.model.city, this.model.postalCode] },
    ];
  }
}
