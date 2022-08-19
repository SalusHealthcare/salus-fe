import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';

@NgModule({
  declarations: [RemoteEntryComponent, ProfileViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
        children: [
          {
            path: '',
            component: ProfileViewComponent,
            children: [
              {
                path: 'view',
                loadChildren: () =>
                  import('features-edit-person/Module').then(
                    (m) => m.RemoteEntryModule
                  ),
              },
              {
                path: 'password',
                loadChildren: () =>
                  import('features-password-change/Module').then(
                    (m) => m.RemoteEntryModule
                  ),
              },
              { path: '', pathMatch: 'full', redirectTo: 'view' },
            ],
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
