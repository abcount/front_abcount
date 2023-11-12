import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExchangeMoneyDto, ExchangeRateCreate, ExchangeRateDto } from 'src/app/dto/exchangeRate.dto';
import { DataService } from 'src/app/services/data.service';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-currency-exchange-edit',
  templateUrl: './currency-exchange-edit.component.html',
  styleUrls: ['./currency-exchange-edit.component.css']
})
export class CurrencyExchangeEditComponent implements OnChanges {

  @Input() register: ExchangeRateDto = { date: '', values: [] };
  @Input() flag: boolean = false;
  @Output() flagChange = new EventEmitter<boolean>();

  close() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }
  
  form: FormGroup;
  currencies: ExchangeMoneyDto[] = [];
  principalCurrency!: ExchangeMoneyDto;
  date: String = '';
  patternNumber = '^[0-9.]*$';
  patternNumberMessage = 'Ingrese un valor válido';
  errorMessage = '';

  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.register);
    this.date = this.register.date;
    this.dataService.getExchangeMoney().subscribe({
      next: (data) => {
        if(data.success){
          this.currencies = data.data!;
          this.currencies.forEach(currency => {
            (this.form.get('values') as FormGroup).addControl(currency.abbreviationName, 
              new FormControl());
          });
          this.principalCurrency = this.currencies.find(currency => currency.isPrincipal)!;
        }
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          disableClose: true,
          data: {title: 'Ocurrio un error!', message: "No se pudo obtener la lista de monedas"}
        });
        message.afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        })
      }
    });
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      date: new FormControl(new Date().toISOString().split('T')[0]),
      values: new FormGroup({})
    });
  }

  getLabelDate(dateNew: string): string {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio','julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const [day, month, year] = dateNew.split('-').map(Number);
    const formattedDate = day+' de '+months[month-1]+' de '+year;
    return formattedDate;
  }

  getCurrencyControl(currency: string): FormControl {
    return this.form.get('values')?.get(currency) as FormControl;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['register']) {
      this.date = this.getLabelDate(this.register.date);
      this.currencies.forEach(currency => {
        const value = this.register.values.find(item => item.abbreviation === currency.abbreviationName)?.value;
        this.getCurrencyControl(currency.abbreviationName).setValue(value);
      });
    }
  }

  saveOrUpdate(): void {
    if(this.form.valid){
      var flagEmpty = false;
      this.currencies.forEach(currency => {
        if(this.form.value.values[currency.abbreviationName] === ''){
          flagEmpty = true;
        }
      });
      if (flagEmpty) {
        this.errorMessage = 'Debe llenar todos los campos';
      } else {
        this.errorMessage = '';
        var currencyList: ExchangeRateCreate[] = [];
        this.currencies.forEach(currency => {
          const exchangeRateCreate: ExchangeRateCreate = {
            moneyName: currency.moneyName,
            abbreviationName: currency.abbreviationName,
            currency: parseFloat(this.form.value.values[currency.abbreviationName] ? this.form.value.values[currency.abbreviationName] : 0)
          }
          currencyList.push(exchangeRateCreate);
        });
        this.register.values.forEach(value => {
          const found = currencyList.find(item => item.abbreviationName === value.abbreviation);
          if(found){
            value.value = found.currency;
          }
        });
        console.log(currencyList);
        console.log(this.register);
        /*this.dataService.createExchangeRate(currencyList).subscribe({
          next: (data) => {
            if(data.success){
              const message = this.dialog.open(MessageDialogComponent, {
                data: {title: 'Exito!', message: data.message}
              });
              message.afterClosed().subscribe(() => {
                this.close();
              })
            }else{
              const message = this.dialog.open(MessageDialogComponent, {
                data: {title: 'Ocurrio un error!', message: data.message}
              });
            }
          },
          error: (error) => {
            const message = this.dialog.open(MessageDialogComponent, {
              data: {title: 'Ocurrio un error!', message: "No se pudo crear el tipo de cambio"}
            });
          },
        });*/
      }
    }
  }
  
}
