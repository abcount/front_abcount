import { Component, ElementRef, ViewChild } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {FormStateService} from "../../../services/form-state.service";

@Component({
  selector: 'app-tap3',
  templateUrl: './tap3.component.html',
  styleUrls: ['./tap3.component.css']
})
export class Tap3Component {
  fechaActual: Date = new Date();
  monedasSugeridas: any[] = [];
  monedasSeleccionadas: any[] = [];

  monedasLocalStorage: any []=[];
  moneyName: string = '';

  color: string = '#CFF4E8';

  constructor(public formService: FormStateService) {
    // this.cargarNombresMonedasDesdeLocalStorage();
    this.guardarJSON();
  }

  buscarSugerencias() {
    this.formService.searchCurrency(this.moneyName).subscribe(
      (response: any) => {
        if (response.success) {
          this.monedasSugeridas = response.data;
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error al buscar monedas:', error);
      }
    );
  }

  seleccionarMoneda(moneda: any) {
    if (!this.monedasSeleccionadas.some(m => m.exchangeId === moneda.exchangeId)) {
      this.monedasSeleccionadas = [...this.monedasSeleccionadas, moneda];
      this.agregarMonedaId(moneda.exchangeId);
       // this.guardarNombresMonedasEnLocalStorage();
    }
    this.moneyName = '';
    this.monedasSugeridas = [];


  }
  // guardarNombresMonedasEnLocalStorage() {
  //   const monedasNombres = this.monedasSeleccionadas.map(m => m.moneyName);
  //   localStorage.setItem('nombresMonedasSeleccionadas', JSON.stringify(monedasNombres));
  // }
  // cargarNombresMonedasDesdeLocalStorage() {
  //   const nombresGuardados = localStorage.getItem('nombresMonedasSeleccionadas');
  //   if (nombresGuardados) {
  //     const monedasNombres: string[] = JSON.parse(nombresGuardados);
  //     this.monedasSeleccionadas = monedasNombres.map((nombre: string) => ({ moneyName: nombre }));
  //   }
  // }

  removerMoneda(exchangeId: number) {
    const index = this.monedasSeleccionadas.findIndex(m => m.exchangeId === exchangeId);
    this.removerMonedaId(index);
    this.monedasSeleccionadas = this.monedasSeleccionadas.filter(m => m.exchangeId !== exchangeId);
    // this.guardarEnLocalStorage();
  }

  agregarMonedaId(id: number) {
    const currencyList = this.formGroup.get('currencyConfig.currencyList') as FormArray;
    currencyList.push(this.formService.fb.control(id));
    // this.guardarEnLocalStorage();
  }

  removerMonedaId(index: number) {
    const currencyList = this.formGroup.get('currencyConfig.currencyList') as FormArray;
    currencyList.removeAt(index);
    // this.guardarEnLocalStorage();
  }

  // guardarEnLocalStorage() {
  //   const monedasIds = this.monedasSeleccionadas.map(moneda => moneda.exchangeId);
  //   localStorage.setItem('monedasSeleccionadas', JSON.stringify(monedasIds));
  // }


  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }

  guardarJSON() {
    const monedasIds = this.monedasSeleccionadas.map(moneda => moneda.exchangeId);
    const jsonData = {
      principalCurrency: 0,
      monedasIds: monedasIds,
    };

    console.log('Datos en JSON:');
    console.log(jsonData);

    const monedasFormArray = this.formService.fb.array(monedasIds);
    const configCurrencyGroup = this.formGroup.get('currencyConfig') as FormGroup;
    configCurrencyGroup.setControl('currencyList', monedasFormArray);
    configCurrencyGroup.get('principal')?.setValue(jsonData.principalCurrency);
  }
}
