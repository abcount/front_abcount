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

  constructor(public formService: FormStateService) {}

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

  @ViewChild('errorName') errorName: ElementRef;
  @ViewChild('errorCode') errorCode: ElementRef;
  @ViewChild('errorEmpty') errorEmpty: ElementRef;
  guardarMoneda() {
    const nombresMonedas = this.monedas.map(moneda => moneda.nombre);
    const codigosISO = this.monedas.map(moneda => moneda.codigo);
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
      this.monedas.push({ nombre: this.nombreMoneda, codigo: this.codigoISO });
      this.mostrarPopup = false;
      this.nombreMoneda = '';
      this.codigoISO = '';
    }
    console.log(this.monedas);
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
  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }
  get dateControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('fecha') as FormControl;
  }

  get levelControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('nivel') as FormControl;

  }
  get nameControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('nombre') as FormControl;
  }

  get codeControl(): FormControl {
    return (this.formGroup.get('enterprise') as FormGroup).get('codigo') as FormControl;

  }

  placeholderCoin:  string = 'Ejemplo: Dólar';
  placeholderISO: string = 'Ejemplo: USD';

  onClick() {
    console.log('Button clicked!');
  }

  onInputText(text: string) {
    console.log('Text changed: ' + text);
  }

}
