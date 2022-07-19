import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponentModule } from './features/header/header.component';
import { NavigationComponentModule } from './features/navigation/navigation.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    HeaderComponentModule,
    NavigationComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
