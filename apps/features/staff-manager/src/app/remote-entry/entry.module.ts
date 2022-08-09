import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { MatTableModule } from '@angular/material/table';
import { CreateStaffComponent } from './components/create-staff/create-staff.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { FormelloModule } from '@salus/forms';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    CreateStaffComponent,
    StaffListComponent,
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
        ],
      },
    ]),
    MatTableModule,
    FormelloModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
