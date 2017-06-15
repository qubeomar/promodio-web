import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})

export class AppComponent implements OnInit {
  public ngOnInit() {
    document.body.removeAttribute('class');
  };
}
