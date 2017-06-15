import { Component } from '@angular/core';

@Component({
  selector: 'loading-stub',
  template: `
    <div class="loadingStub">
      <span>Loading...</span>    
    </div>
  `,
  styles: [`
    div {
      animation: fadeIn .5s 1 ease-in-out;
      text-align: center;
    }
    span {
      display: inline-block;
      height: 50px;
      padding-left: 50px;
      color: #7b7b7b;
      text-shadow: 1px 1px 3px #d2d4d4;
      font: normal 18px/50px Karla, sans-serif;
      background: url(../../../assets/img/spinner.gif) no-repeat 15px center; background-size: 22px;}
  `]
})

export class LoadingStubComponent {}
