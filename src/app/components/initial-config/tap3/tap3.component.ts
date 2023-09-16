import { Component } from '@angular/core';

@Component({
  selector: 'app-tap3',
  templateUrl: './tap3.component.html',
  styleUrls: ['./tap3.component.css']
})
export class Tap3Component {

  monedas: { nombre: string, codigo: string }[] = [];
  mostrarPopup: boolean = false;
  nombreMoneda: string = '';
  codigoISO: string = '';

  color = '#CFF4E8'

  agregarMoneda() {
    this.mostrarPopup = true;
    this.nombreMoneda = '';
    this.codigoISO = '';
  }

  guardarMoneda() {
    if (this.nombreMoneda && this.codigoISO) {
      this.monedas.push({ nombre: this.nombreMoneda, codigo:this.codigoISO });
      console.log(this.monedas);
      this.mostrarPopup = false;
      this.nombreMoneda = '';
      this.codigoISO = '';
    }
  }

  cancelar() {
    this.mostrarPopup = false;
    this.nombreMoneda = '';
    this.codigoISO = '';
  }

  removerMoneda(moneda: { nombre: string, codigo: string }) {
    const index = this.monedas.indexOf(moneda);
    if (index !== -1) {
      this.monedas.splice(index, 1);
    }
  }
  buttonText1: string = 'AGREGAR';
  buttonText2: string = 'GUARDAR';
  buttonText3: string = 'CANCELAR';

  placeholderDate: string = '10/09/2023';

  placeholderLevels: string = 'Niveles del plan de cuentas (x.x.x.x)';

  placeholderCoin:  string = 'Ejemplo: Dólar';

  placeholderISO: string = 'Ejemplo: USD';


  onClick() {
    console.log('Button clicked!');
  }

  onInputText(text: string) {
    console.log('Text changed: ' + text);
  }

}
