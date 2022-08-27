import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { RecordsListComponent } from './components/records-list/records-list.component';
import { MatTableModule } from '@angular/material/table';
import { HelpersModule } from '@salus/helpers';
import { AddRecordDialogComponent } from './components/add-record-dialog/add-record-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormelloModule } from '@salus/forms';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    RecordsListComponent,
    AddRecordDialogComponent,
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
            component: RecordsListComponent,
          },
        ],
      },
    ]),
    MatTableModule,
    MatDialogModule,
    HelpersModule,
    FormelloModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
