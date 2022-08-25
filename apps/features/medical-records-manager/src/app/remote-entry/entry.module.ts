import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { RecordsListComponent } from './components/records-list/records-list.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [RemoteEntryComponent, RecordsListComponent],
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
  ],
  providers: [],
})
export class RemoteEntryModule {}
