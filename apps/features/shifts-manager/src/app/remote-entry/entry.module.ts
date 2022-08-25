import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ShiftEditorComponent } from './components/shift-editor/shift-editor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormelloModule } from '@salus/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import {
  DateAdapter,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddShiftDialogComponent } from './components/add-shift-dialog/add-shift-dialog.component';
import { HelpersModule } from '@salus/helpers';
@NgModule({
  declarations: [
    RemoteEntryComponent,
    CalendarComponent,
    ShiftEditorComponent,
    AddShiftDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [
          {
            path: '',
            component: ShiftEditorComponent,
          },
        ],
      },
    ]),
    MatDatepickerModule,
    FormelloModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    HelpersModule,
  ],
})
export class RemoteEntryModule {}
