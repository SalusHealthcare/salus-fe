import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { MatTableModule } from '@angular/material/table';
import { CreateStaffComponent } from './components/create-staff/create-staff.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { FormelloModule } from '@salus/forms';
import { EditStaffComponent } from './components/edit-staff/edit-staff.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    RemoteEntryComponent,
    CreateStaffComponent,
    StaffListComponent,
    EditStaffComponent,
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
            component: StaffListComponent,
          },
          {
            path: 'create',
            component: CreateStaffComponent,
          },
          {
            path: 'edit/:id',
            loadChildren: () =>
              import('features-edit-person/Module').then(
                (m) => m.RemoteEntryModule
              ),
          },
        ],
      },
    ]),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    FormelloModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
