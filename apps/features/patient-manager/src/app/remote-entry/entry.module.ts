import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { MatTableModule } from '@angular/material/table';
import { FormelloModule } from '@salus/forms';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    PatientsListComponent,
    PatientDetailComponent,
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
            component: PatientsListComponent,
          },
          {
            path: ':id',
            component: PatientDetailComponent,
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('features-medical-records-manager/Module').then(
                    (m) => m.RemoteEntryModule
                  ),
              },
            ],
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
