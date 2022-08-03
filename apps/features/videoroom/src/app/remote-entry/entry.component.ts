import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import DailyIframe, { DailyCall, DailyCallOptions } from '@daily-co/daily-js';

@Component({
  selector: 'salus-features-videoroom-entry',
  templateUrl: `entry.component.html`,
})
export class RemoteEntryComponent {
  @ViewChild('dailyContainer', { static: true }) dailyContainer:
    | ElementRef<HTMLIFrameElement>
    | undefined;

  iframeProperties: DailyCallOptions = {
    url: '',
  };

  callFrame: DailyCall | undefined;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.iframeProperties.url = `https://salus.daily.co/${params['roomId']}`;
      if (this.dailyContainer) {
        this.callFrame = DailyIframe.wrap(
          this.dailyContainer.nativeElement,
          this.iframeProperties
        );
        this.callFrame.join();
      }
    });
  }
}
