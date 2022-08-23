import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { FormelloModule } from '@salus/forms';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
      },
    ]),
    FormelloModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
