import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { NewReservationComponent } from './components/new-reservation/new-reservation.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormelloModule } from '@salus/forms';
import { ReserveDialogComponent } from './components/reserve-dialog/reserve-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HelpersModule } from '@salus/helpers';

@NgModule({
  declarations: [
    RemoteEntryComponent,
    ReservationsListComponent,
    NewReservationComponent,
    ReserveDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [
          {
            path: 'new',
            component: NewReservationComponent,
          },
          {
            path: 'list',
            component: ReservationsListComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list',
          },
        ],
      },
    ]),
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormelloModule,
    HelpersModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
