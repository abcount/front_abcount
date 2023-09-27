import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration-tap3',
  templateUrl: './configuration-tap3.component.html',
  styleUrls: ['./configuration-tap3.component.css']
})
export class ConfigurationTap3Component {

  // Variables
  registerDate: string = '';
  showPopup: boolean = false;
  currencies: any[] = [];
  currencyName: string = '';
  currencyCode: string = '';

  // Constructor
  constructor(private ConfigurationService: ConfigurationService) { }

  // Cargar los datos
  ngOnInit() {
    this.ConfigurationService.getCurrencies().subscribe((data: any) => {
      console.log(data);
      this.currencies = data.currencyConfig.currencyList;
      this.registerDate = data.currencyConfig.openingDate;
    });
  }

  // Función para agregar moneda
  addCurrency() {
    this.showPopup = true;
    this.currencyName = '';
    this.currencyCode = '';
  }

  // Controladores de mensajes de error
  @ViewChild('errorName') errorName: ElementRef;
  @ViewChild('errorCode') errorCode: ElementRef;
  @ViewChild('errorEmpty') errorEmpty: ElementRef;
  
  // Función para guardar moneda
  saveCurrency() {
    const currencyNames = this.currencies.map(currency => currency.moneyName);
    const currencyCodes = this.currencies.map(currency => currency.abbreviationName);
    if (currencyNames.includes(this.currencyName)){
      this.errorName.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorName.nativeElement.classList.remove('show');
      }, 2000);
    } else if (currencyCodes.includes(this.currencyCode)){
        this.errorCode.nativeElement.classList.add('show');
        setTimeout(() => {
          this.errorCode.nativeElement.classList.remove('show');
        }, 2000);
    } else if (this.currencyCode.length == 0 || this.currencyName.length == 0) {
      this.errorEmpty.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorEmpty.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.ConfigurationService.addCurrency(this.currencyName, this.currencyCode).subscribe((data: any) => {
        console.log(data);
        this.currencies = data.currencyConfig.currencyList;
        this.showPopup = false;
      });
    }
  }


  // Función para calcelar el agregado de moneda
  cancel() {
    this.showPopup = false;
  }
}
