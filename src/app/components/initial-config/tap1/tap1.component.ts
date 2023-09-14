import { Component } from '@angular/core';

@Component({
  selector: 'app-tap1',
  templateUrl: './tap1.component.html',
  styleUrls: ['./tap1.component.css']
})
export class Tap1Component {

  buttonText: string = 'Click me!';
  onClick() {
    console.log('Button clicked!');
  }

}
