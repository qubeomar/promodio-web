import { Component } from '@angular/core';

@Component({
  selector: 'guest-home-page',
  templateUrl: './guest-home-page.component.html',
  styleUrls: [ './guest-home-page.component.css' ]
})

export class GuestHomePageComponent {
  public isLoaded: boolean = false;
  public topItems: any[] = [];
}
