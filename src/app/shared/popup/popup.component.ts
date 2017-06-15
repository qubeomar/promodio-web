import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'popup',
  template: `
    <div class="popupLayer" (click)="layerClick()"></div>
    <ng-content></ng-content>
  `,
  styles: [`
    body.locked {
      overflow: hidden;
    }


    /*.popupLayer {background: rgba(224, 224, 224, .82) url("../../../assets/img/design-png/5 3 Artist profile - photo zoom.png") no-repeat center !important;}*/


    .popupLayer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      width: 0;
      height: 0;
      margin: auto;
      opacity: 0;
      background: rgba(0, 0, 0, .7);
      transition: opacity .5s,
      width .3s,
      height .3s;
    }
    .popupLayer:hover {
      cursor: pointer;
    }
    .visible > .popupLayer {
      width: 100%;
      height: 100%;
      opacity: 1;
    }

    .popupContent {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 200;
      margin: auto;
      overflow: hidden;
      box-shadow: 0 0 5px #000;
      border-radius: 3px;
    }

    .popupContent > .close {
      position: absolute;
      top: 5px;
      right: 5px;
      display: block;
      width: 20px;
      height: 20px;
      padding: 0;
      margin: 0;
      background: transparent;
      border: none;
      border-radius: 0;
      font: normal 15px/20px Arial, sans-serif;
      text-align: center;
      color: #5f5f5f;
      outline: none;
      transition: text-shadow .5s;
    }
    .popupContent > .close:after {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      content: "╳";
    }
    .popupContent > .close:hover {
      text-shadow: 1px 1px 3px rgba(154, 154, 154, 0.87);
      cursor: pointer;
    }
  `],
  encapsulation: ViewEncapsulation.None
})

export class PopupComponent {
  @Input() public set active(value: boolean) {
    (value
      ? document.body.className = 'locked'
      : document.body.className = document.body.className.replace('locked', '').trim()
    );
  };
  @Output() public onclose = new EventEmitter();

  public layerClick() {
    this.onclose.emit();
  };
}
