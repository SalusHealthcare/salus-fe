import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { FormelloModule } from 'formello';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
