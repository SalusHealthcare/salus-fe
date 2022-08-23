import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { MatTableModule } from '@angular/material/table';
import { FormelloModule } from '@salus/forms';

@NgModule({
  declarations: [RemoteEntryComponent, PatientsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [
          {
            path: '',
            component: PatientsListComponent,
          },
        ],
      },
    ]),
    MatTableModule,
    FormelloModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
