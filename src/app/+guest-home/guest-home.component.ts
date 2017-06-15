import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'guest-home',
  templateUrl: './guest-home.component.html',
  styleUrls: [ './guest-home.component.css' ]
})

export class GuestHomeComponent implements OnInit {
  public showPopup: boolean;
  public popupName: string;

  constructor(private router: Router) {};

  public ngOnInit() {
    this.showPopup = (this.router.url === '/login' || this.router.url === '/registration');
    this.popupName = this.router.url.replace(/[\W\D]/, '');
  };

  public closePopup() {
    this.showPopup = false;
    this.router.navigate(['/']);
  }
}
