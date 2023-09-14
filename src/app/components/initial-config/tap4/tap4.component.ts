import { Component } from '@angular/core';

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.component.html',
  styleUrls: ['./tap4.component.css']
})
export class Tap4Component {

  buttonText: string = 'Click me!';
  placeholderText: string = 'Enter text here...';


  onClick() {
    console.log('Button clicked!');
  }

  onTextChanged(text: string) {
    console.log('Text changed: ' + text);
  }



}
