import { Component } from '@angular/core';

@Component({
  selector: 'forbidden',
  template: `
    <div>
      <h1>Forbidden</h1>
      <p>Content that you're trying get to is not available for you</p>
    </div>
  `
})

export class ForbiddenComponent {}
