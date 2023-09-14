import { Component } from '@angular/core';

@Component({
  selector: 'app-tap2',
  templateUrl: './tap2.component.html',
  styleUrls: ['./tap2.component.css']
})
export class Tap2Component {

  buttonText: string = 'AGREGAR';
  placeholderSubsidiary: string = 'Ingrese el nombre de tu sucursal';

  placeholderAddress: string = 'Ingrese la direccion de tu sucursal';
  placeholderArea: string = 'Ingrese el nombre de tu area';

  onClick() {
    console.log('Button clicked!');
  }

  onInputText(text: string) {
    console.log('Text changed: ' + text);
  }

}
