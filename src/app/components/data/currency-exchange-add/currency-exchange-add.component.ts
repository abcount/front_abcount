import { Component } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExchangeMoneyDto, ExchangeRateDto, ExchangeRateCreate} from "../../../dto/exchangeRate.dto";
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AcceptDialogComponent } from '../../general-components/accept.dialog/accept.dialog.component';

@Component({
  selector: 'app-currency-exchange-add',
  templateUrl: './currency-exchange-add.component.html',
  styleUrls: ['./currency-exchange-add.component.css']
})
export class CurrencyExchangeAddComponent {
  form: FormGroup;
  currencies: ExchangeMoneyDto[] = [];
  principalCurrency!: ExchangeMoneyDto;
  date: String = '';
  errorMessage = '';

  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';


  selectedRecord?: ExchangeRateDto;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataService.getExistExchangeRate().subscribe({
      next: (data) => {
        if(data.data){
          const message = this.dialog.open(MessageDialogComponent, {
            data: {title: 'Ocurrio un error!', message: "Ya existe un tipo de cambio registrado para el día de hoy"}
          });
          message.afterClosed().subscribe(() => {
            this.router.navigate(['/configuration-tap/1']);
          });

        }
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          data: {title: 'Ocurrio un error!', message: "No se pudo conectar con el servidor. Intente de nuevo más tarde"}
        });
      }
    });
    this.initForm();
    this.date = this.getLabelDate();
    this.fetchCurrencies();
  }

  initForm(): void {
    this.form = new FormGroup({
      date: new FormControl(new Date().toISOString().split('T')[0]),
      values: new FormGroup({})
    });
  }

  fetchCurrencies(){
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
          this.router.navigate(['/']);
        })
      }
    });
    
  }

  close(){
    const acceptMessage = this.dialog.open(AcceptDialogComponent, {
      width: '400px',
      data: {
        title: 'ADVERTENCIA: ¿Desea salir?', 
        message: "Es necesario registrar el cambio del día, de lo contrario no podrá realizar ninguna transacción.", 
        route: "/accounting-voucher/view"}
    });
  }

  getLabelDate(): String{
    const fechaActual = new Date();
    const formattedDate = format(fechaActual, "d 'de' MMMM 'de' yyyy", { locale: es });
    return formattedDate;
  }


  loadExchangeRateForEdit(record: ExchangeRateDto): void {
    this.selectedRecord = { ...record };

    const valuesObject: { [currency: string]: number } = {};
    this.selectedRecord.values.forEach(item => {
      valuesObject[item.abbreviation] = item.value;
    });

    this.form.setValue({
      date: this.selectedRecord.date,
      values: valuesObject
    });
  }

  saveOrUpdate(): void {
    if(this.form.valid){
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
      console.log(currencyList);
      this.dataService.createExchangeRate(currencyList).subscribe({
        next: (data) => {
          if(data.success){
            const message = this.dialog.open(MessageDialogComponent, {
              data: {title: 'Exito!', message: data.message}
            });
            message.afterClosed().subscribe(() => {
              this.router.navigate(['/accounting-voucher/view']);
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
      });
    }else{
      this.errorMessage = '* Ingrese todos los campos requeridos';
  

    }
  }


  cancelEdit(): void {
    this.selectedRecord = undefined;
    this.form.reset();
    this.router.navigate(['/exchangeView']);
  }
  getDateControl(): FormControl {
    return this.form.get('date') as FormControl;
  }

  getCurrencyControl(currency: string): FormControl {
    return this.form.get('values')?.get(currency) as FormControl;
  }


}
