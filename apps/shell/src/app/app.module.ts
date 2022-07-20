import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponentModule } from './features/header/header.component';
import { NavigationComponentModule } from './features/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'structure',
          loadChildren: () =>
            import('features-structure-manager/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
        {
          path: 'staff',
          loadChildren: () =>
            import('features-staff-manager/Module').then(
              (m) => m.RemoteEntryModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
    HeaderComponentModule,
    NavigationComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
