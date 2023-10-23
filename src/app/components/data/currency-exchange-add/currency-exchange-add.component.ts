import { Component } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ExchangeMoneyDto, ExchangeRateDto} from "../../../dto/exchangeRate.dto";
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';

@Component({
  selector: 'app-currency-exchange-add',
  templateUrl: './currency-exchange-add.component.html',
  styleUrls: ['./currency-exchange-add.component.css']
})
export class CurrencyExchangeAddComponent {
  form: FormGroup;
  currencies: ExchangeMoneyDto[] = [];

  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';


  selectedRecord?: ExchangeRateDto;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
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
            (this.form.get('values') as FormGroup).addControl(currency.abbreviationName, new FormControl());
          });
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
    console.log(this.form.value);
    /*
    const dateValue = this.form.get('date')?.value;
    const valuesObject = this.form.get('values')?.value as { [key: string]: number };
    const valuesArray: { abbreviation: string, value: number }[] = [];
    for (const currency in valuesObject) {
      if (valuesObject.hasOwnProperty(currency)) {
        valuesArray.push({
          abbreviation: currency,
          value: valuesObject[currency]
        });
      }
    }
    const formData: ExchangeRateDto = {
      id: this.selectedRecord ? this.selectedRecord.id : undefined,
      date: dateValue,
      values: valuesArray
    };
    formData.values = valuesArray;

    if (this.selectedRecord) {
      this.dataService.updateExchangeRate(formData).subscribe(updatedRecord => {
        this.router.navigate(['/view-component-route']);
      }, error => {
        console.error('Error updating record', error);
      });
    } else {
      this.dataService.createExchangeRate(formData).subscribe(newRecord => {
        this.router.navigate(['/view-component-route']);
      }, error => {
        console.error('Error saving record', error);
      });
    }*/
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
