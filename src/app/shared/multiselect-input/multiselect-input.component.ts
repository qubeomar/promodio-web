import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'multiselect-input',
  templateUrl: './multiselect-input.component.html',
  styleUrls: [ './multiselect-input.component.css' ]
})

export class MultiselectInputComponent {
  @Input() public options: any[] = [];

  @Output() public onselect = new EventEmitter();
}
