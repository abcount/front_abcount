import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-my-textfield',
  templateUrl: './my-textfield.component.html',
  styleUrls: ['./my-textfield.component.css']
})
export class MyTextfieldComponent {

  @Input() placeholder: string = '';
  @Input('formControlName') value: string = '';






}
