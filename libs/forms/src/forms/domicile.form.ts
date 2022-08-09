import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormelloField } from '../lib/formello/FormelloField';
import { IFormelloConfig } from '../lib/models/interfaces/IFormelloConfig.interface';
import { FormelloFieldTypes } from '../lib/models/interfaces/IFormelloField.interface';
import { IFormelloRow } from '../lib/models/interfaces/IFormelloRow.interface';

@Injectable()
export class DomicileFormModel {
  // Readonly fields
  id = new FormelloField('id', 'Id', '', FormelloFieldTypes.TEXT);
  // Visible fields
  street = new FormelloField('street', 'Street', '', FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);
  number = new FormelloField('number', 'Number', '', FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);
  city = new FormelloField('city', 'City', '', FormelloFieldTypes.TEXT, [
    Validators.required,
  ]);
  province = new FormelloField(
    'province',
    'Province',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  postCode = new FormelloField(
    'postCode',
    'Postal Code',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  country = new FormelloField(
    'country',
    'Country',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
}

export class DomicileFormConfig implements IFormelloConfig<DomicileFormModel> {
  model: DomicileFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: DomicileFormModel) {
    this.model = model;
    this.rows = [
      {
        fields: [
          this.model.street,
          this.model.number,
          this.model.city,
          this.model.province,
        ],
      },
      { fields: [this.model.postCode, this.model.country] },
    ];
  }
}
