import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormelloField } from '../lib/formello/FormelloField';
import { IFormelloConfig } from '../lib/models/interfaces/IFormelloConfig.interface';
import { FormelloFieldTypes } from '../lib/models/interfaces/IFormelloField.interface';
import { IFormelloRow } from '../lib/models/interfaces/IFormelloRow.interface';

@Injectable()
export class PasswordFormModel {
  originalPassword = new FormelloField(
    'originalPassword',
    'Current Password',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
  newPassword = new FormelloField(
    'newPassword',
    'New Password',
    '',
    FormelloFieldTypes.TEXT,
    [Validators.required]
  );
}

export class PasswordFormConfig implements IFormelloConfig<PasswordFormModel> {
  model: PasswordFormModel;
  rows: Array<IFormelloRow>;

  constructor(model: PasswordFormModel) {
    this.model = model;
    this.rows = [
      {
        fields: [this.model.originalPassword, this.model.newPassword],
      },
    ];
  }
}
