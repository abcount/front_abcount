import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { FormStateService } from 'src/app/services/form-state.service';

@Component({
  selector: 'app-configuration-tap3',
  templateUrl: './configuration-tap3.component.html',
  styleUrls: ['./configuration-tap3.component.css']
})
export class ConfigurationTap3Component {

  // Variables
  registerDate: string = '';
  modeEdit: boolean = false;
  currencies: any[] = [];
  monedasSugeridas: any[] = [];
  monedasSeleccionadas: any[] = [];
  moneyName = new FormControl();
  color: string = '#CFF4E8';

  // Constructor
  constructor(private ConfigurationService: ConfigurationService, private formService: FormStateService) { }

  // Cargar los datos
  ngOnInit() {
    this.ConfigurationService.getCurrencies().subscribe((data: any) => {
      console.log(data);
      this.currencies = data.data.currencyConfig;
      this.registerDate = data.data.openingDate;
    });
  }

  buscarSugerencias() {
    this.formService.searchCurrency(this.moneyName.value).subscribe(
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
    const currenciesId = this.currencies.map(c => c.exchangeId);
    if (!this.monedasSeleccionadas.some(m => m.exchangeId === moneda.exchangeId)) {
      if (!currenciesId.includes(moneda.exchangeId)) {
        this.monedasSeleccionadas = [...this.monedasSeleccionadas, moneda];
        this.monedasSeleccionadas.push(moneda.exchangeId);
      }
    }
    this.moneyName;
    this.monedasSugeridas = [];
  }

  removerMoneda(exchangeId: number) {
    this.monedasSeleccionadas = this.monedasSeleccionadas.filter(m => m.exchangeId !== exchangeId);
  }

  // Función para guardar moneda
  save() {
    console.log(this.monedasSeleccionadas);
  }

  // Función para editar moneda
  enable() {
    this.modeEdit = true;
  }

  // Función para calcelar el agregado de moneda
  cancel() {
    this.modeEdit = false;
    this.monedasSeleccionadas = [];
    this.moneyName.reset();
  }
}
