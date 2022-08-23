import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import DailyIframe, { DailyCall, DailyCallOptions } from '@daily-co/daily-js';

@Component({
  selector: 'salus-features-videoroom-entry',
  templateUrl: `entry.component.html`,
})
export class RemoteEntryComponent implements OnDestroy {
  @ViewChild('dailyContainer', { static: true }) dailyContainer:
    | ElementRef<HTMLIFrameElement>
    | undefined;

  roomId = 'salus-test';
  iframeProperties: DailyCallOptions = {
    url: '',
  };

  callFrame: DailyCall | undefined;

  httpHeader: HttpHeaders = new HttpHeaders({
    Authorization:
      'Bearer 3ffb1881b0e8916aad751630fe9fb91f706274b7e8382f8c6e66c7796000a649',
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.roomId = params['roomId'];
      this.createRoomOnDaily().subscribe((result) => {
        if (result) {
          this.iframeProperties.url = `https://salus.daily.co/${params['roomId']}`;
          console.log(params, this.iframeProperties.url);
          if (this.dailyContainer) {
            this.callFrame = DailyIframe.wrap(
              this.dailyContainer.nativeElement,
              this.iframeProperties
            );
            this.callFrame.join();
          }
        }
      });
    });
  }

  createRoomOnDaily() {
    return this.http.post(
      'https://salus.daily.co/api/v1/rooms',
      {
        name: this.roomId,
        properties: {
          max_participants: 2,
          enable_chat: true,
        },
      },
      { headers: this.httpHeader }
    );
  }

  deleteRoomOnDaily() {
    this.http
      .delete(`https://salus.daily.co/api/v1/rooms/${this.roomId}`, {
        headers: this.httpHeader,
      })
      .subscribe((result) => {
        console.log(result);
      });
  }

  ngOnDestroy(): void {
    this.deleteRoomOnDaily();
  }
}
