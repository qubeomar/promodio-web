import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ios-checkbox',
  template: `
    <div class="iosCheckbox" (click)="change()" [class.active]="value">
      <div></div>
    </div>
  `
})

export class IOSCheckboxComponent implements OnInit {
  @Input() public defaultValue: boolean;
  @Output() public onValueChange = new EventEmitter();

  public value: boolean;

  public ngOnInit() {
    this.value = this.defaultValue;
  };

  public change() {
    if (typeof this.value !== undefined) {
      this.value = !this.value;
      this.onValueChange.emit(this.value);
    }
  };
}
