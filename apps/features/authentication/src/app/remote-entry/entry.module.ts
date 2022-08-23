import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RemoteEntryComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login',
          },
        ],
      },
    ]),
    ReactiveFormsModule,
  ],
  providers: [],
})
export class RemoteEntryModule {}
