import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-my-textfield',
  templateUrl: './my-textfield.component.html',
  styleUrls: ['./my-textfield.component.css']
})
export class MyTextfieldComponent {

  @Input() placeholder: string = '';
  @Output() textChanged = new EventEmitter<string>();


  // TODO need to understand how to update the value of the textfield

  onInput(value: string | undefined) {
    this.textChanged.emit(value || ''); // Use empty string if value is undefined
  }




}
