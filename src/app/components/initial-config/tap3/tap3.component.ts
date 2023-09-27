import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FormStateService} from "../../../services/form-state.service";

@Component({
  selector: 'app-tap3',
  templateUrl: './tap3.component.html',
  styleUrls: ['./tap3.component.css']
})
export class Tap3Component {

  //Obtener la fecha actual
  fechaActual: Date = new Date();
  primeraMoneda =  { moneyName: 'Bolivianos', abbreviationName: 'BOB', currency: 0 };
  constructor(public formService: FormStateService) {
    this.monedas.push({ ...this.primeraMoneda });
    this.guardarJSON();
  }

  monedas: { moneyName: string, abbreviationName: string, currency:number}[] = [];
  mostrarPopup: boolean = false;
  nombreMoneda: string = '';
  codigoISO: string = '';

  valorCurrency:number =0;

  color = '#CFF4E8'

  agregarMoneda() {
    this.mostrarPopup = true;
    this.nombreMoneda = '';
    this.codigoISO = '';
  }

  @ViewChild('errorName') errorName: ElementRef;
  @ViewChild('errorCode') errorCode: ElementRef;
  @ViewChild('errorEmpty') errorEmpty: ElementRef;
  guardarMoneda() {
    const nombresMonedas = this.monedas.map(moneda => moneda.moneyName);
    const codigosISO = this.monedas.map(moneda => moneda.abbreviationName);
    if (nombresMonedas.includes(this.nombreMoneda)) {
      this.errorName.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorName.nativeElement.classList.remove('show');
      }, 2000);
    } else if (codigosISO.includes(this.codigoISO)) {
      this.errorCode.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorCode.nativeElement.classList.remove('show');
      }, 2000);
    } else if (this.codigoISO.length == 0 || this.nombreMoneda.length == 0) {
      this.errorEmpty.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorEmpty.nativeElement.classList.remove('show');
      }, 3000);
    } else {
      this.monedas.push({ moneyName: this.nombreMoneda, abbreviationName: this.codigoISO, currency:this.valorCurrency});
      this.mostrarPopup = false;
      this.nombreMoneda = '';
      this.codigoISO = '';
      this.guardarJSON();
    }
    console.log(this.monedas);
  }

  cancelar() {
    this.mostrarPopup = false;
    this.nombreMoneda = '';
    this.codigoISO = '';
  }

  removerMoneda(moneda: { moneyName: string, abbreviationName: string, currency:number }) {
    if (moneda.moneyName === this.primeraMoneda.moneyName && moneda.abbreviationName === this.primeraMoneda.abbreviationName) {
      console.log("No puedes eliminar la primera moneda.");
      return;
    }

    const index = this.monedas.findIndex(m => m.moneyName === moneda.moneyName && m.abbreviationName === moneda.abbreviationName);
    if (index !== -1) {
      this.monedas.splice(index, 1);
      this.guardarJSON();
    }
  }
  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }


  placeholderCoin:  string = 'Ejemplo: Dólar';
  placeholderISO: string = 'Ejemplo: USD';

  onClick() {
    console.log('Button clicked!');
  }

  onInputText(text: string) {
    console.log('Text changed: ' + text);
  }
  printValue() {
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }

  guardarJSON() {
    const jsonData = {
      principalCurrency: 0,
      monedas: this.monedas,
    };

    console.log('Datos en JSON:');
    console.log(jsonData);

    // Crear FormArray para monedas
    const monedasFormArray = this.formService.fb?.array(
      jsonData.monedas.map(moneda => this.formService.fb?.group(moneda))
    );

    // Añadir jsonData al formGroup
    const configCurrencyGroup = this.formGroup?.get('currencyConfig') as FormGroup;
    configCurrencyGroup.setControl('currencyList', monedasFormArray);
    configCurrencyGroup.get('principal')?.setValue(jsonData.principalCurrency);
  }


}
