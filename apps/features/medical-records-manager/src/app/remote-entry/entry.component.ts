import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'salus-features-medical-records-manager-entry',
  templateUrl: './entry.component.html',
})
export class RemoteEntryComponent {
  @HostBinding('class') classes = 'h-full overflow-y-auto';
}
