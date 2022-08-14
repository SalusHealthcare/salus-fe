import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponentModule } from './features/header/header.component';
import { NavigationComponentModule } from './features/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './pages/main/main.component';
import { GraphqlModule } from '@salus/graphql';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('features-authentication/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'app',
          component: MainComponent,
          children: [
            {
              path: 'staff',
              loadChildren: () =>
                import('features-staff-manager/Module').then(
                  (m) => m.RemoteEntryModule
                ),
            },
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'staff',
            },
          ],
        },
        {
          path: 'features-videoroom',
          loadChildren: () =>
            import('features-videoroom/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'features-edit-person',
          loadChildren: () =>
            import('features-edit-person/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    HeaderComponentModule,
    NavigationComponentModule,
    GraphqlModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
