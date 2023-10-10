import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';
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

  // Constructor
  constructor(private configurationService: ConfigurationService, private formService: FormStateService) { }

  // Cargar los datos
  ngOnInit() {
    this.configurationService.getCurrencies().subscribe((data: any) => {
      console.log(data);
      this.currencies = data.data;
      this.registerDate = data.openingDate;
    });
    this.buscarSugerencias();
  }

  buscarSugerencias() {
    this.moneyName.valueChanges.pipe(debounceTime(300)).subscribe(
      (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue.length > 0) {
          this.formService.searchCurrency(value).subscribe(
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
        } else {
          this.monedasSugeridas = [];
        }
      }
    );
  }

  seleccionarMoneda(moneda: any) {
    const currenciesId = this.currencies.map(c => c.exchangeId);
    if (!this.monedasSeleccionadas.some(m => m.exchangeId === moneda.exchangeId)) {
      if (!currenciesId.includes(moneda.exchangeId)) {
        this.monedasSeleccionadas.push(moneda);
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
    const currenciesId = this.monedasSeleccionadas.map(c => c.exchangeId);
    console.log(currenciesId);
    if (currenciesId.length > 0) {
      this.configurationService.addCurrency(currenciesId).subscribe(
        (response: any) => {
          if (response.success) {
            console.log(response.message);
            this.currencies = response.data;
            this.modeEdit = false;
            this.monedasSeleccionadas = [];
            this.moneyName.setValue('');
          } else {
            console.error(response.message);
          }
        },
        (error) => {
          console.error('Error al agregar moneda:', error);
        }
      );
    } else {
      this.modeEdit = false;
      this.monedasSeleccionadas = [];
      this.moneyName.setValue('');
    }
  }

  // Función para editar moneda
  enable() {
    this.modeEdit = true;
  }

  // Función para calcelar el agregado de moneda
  cancel() {
    this.modeEdit = false;
    this.monedasSeleccionadas = [];
    this.moneyName.setValue('');
  }
}
