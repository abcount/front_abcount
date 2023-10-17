import { Component } from '@angular/core';
import {DataService} from "../../../services/data.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ExchangeRateDto} from "../../../dto/exchangeRate.dto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-currency-exchange-add',
  templateUrl: './currency-exchange-add.component.html',
  styleUrls: ['./currency-exchange-add.component.css']
})
export class CurrencyExchangeAddComponent {
  form: FormGroup;
  currencies: string[] = [];

  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';


  selectedRecord?: ExchangeRateDto;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchCurrencies().then(() => {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['data']) {
          const record: ExchangeRateDto = JSON.parse(params['data']);
          this.loadExchangeRateForEdit(record);
        }
      });
    });
  }

  initForm(): void {
    this.form = new FormGroup({
      date: new FormControl(new Date().toISOString().split('T')[0]),
      values: new FormGroup({})
    });
  }

  fetchCurrencies(): Promise<void> {
    return new Promise((resolve) => {
      this.dataService.getCurrencies().subscribe((response: any) => {
        this.currencies = response.currencies;
        const group: any = {};
        for (let currency of this.currencies) {
          group[currency] = new FormControl('');
        }
        this.form.setControl('values', new FormGroup(group));
        resolve();
      });
    });
  }


  loadExchangeRateForEdit(record: ExchangeRateDto): void {
    this.selectedRecord = { ...record };

    const valuesObject: { [currency: string]: number } = {};
    this.selectedRecord.values.forEach(item => {
      valuesObject[item.abbrevation] = item.value;
    });

    this.form.setValue({
      date: this.selectedRecord.date,
      values: valuesObject
    });
  }

  saveOrUpdate(): void {
    const dateValue = this.form.get('date')?.value;
    const valuesObject = this.form.get('values')?.value as { [key: string]: number };
    const valuesArray: { abbrevation: string, value: number }[] = [];
    for (const currency in valuesObject) {
      if (valuesObject.hasOwnProperty(currency)) {
        valuesArray.push({
          abbrevation: currency,
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
