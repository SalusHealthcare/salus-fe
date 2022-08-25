import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { RecordsListComponent } from './components/records-list/records-list.component';
import { MatTableModule } from '@angular/material/table';
import { HelpersModule } from '@salus/helpers';

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
    HelpersModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
