import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExchangeRateDto } from "../../../dto/exchangeRate.dto";
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-currency-exchange-view',
  templateUrl: './currency-exchange-view.component.html',
  styleUrls: ['./currency-exchange-view.component.css']
})
export class CurrencyExchangeViewComponent {
  data: any[] = [];
  displayedColumns: string[] = [];
  allColumns: string[] = [];

  selectedRecord?: ExchangeRateDto;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getExchangeMoney().subscribe((data: any) => {
      this.displayedColumns = data.data.filter((item: any) => item.isPrincipal === false).map((item: any) => item.abbreviationName);
      this.displayedColumns.unshift('Fecha');
      this.allColumns = [...this.displayedColumns, 'Editar'];
      //console.log(this.allColumns);
      this.dataService.getExchangeRates().subscribe(response => {
        this.data = this.transformData(response.data);
        //console.log("Data actualizada:", this.data);
      });
    });
  }

  transformData(data: any[]): any[] {
    const result: any[] = [];
    // Agrupar por fecha
    const groupedByDate: { [date: string]: any[] } = {};
    data.forEach((item) => {
      const date = item.date.split('T')[0]; // Obtener solo la parte de la fecha
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push(item);
    });
    // Crear el resultado
    for (const date in groupedByDate) {
      if (groupedByDate.hasOwnProperty(date)) {
        const currencies: { [currency: string]: number } = {};
        groupedByDate[date].forEach((item: any) => {
          currencies[item.abbreviationName] = item.currency;
        });
        const formattedDate = formatDate(new Date(date), 'dd-MM-yyyy', 'en-US');
        const record = { Fecha: `${formattedDate}`, ...currencies };
        //const record = { date, ...currencies };
        result.push(record);
      }
    }
    return result;
  }

  getValueForCurrency(record: ExchangeRateDto, currency: string): number | undefined {
    const found = record.values.find(item => item.abbreviation === currency);
    return found ? found.value : undefined;
  }

  loadExchangeRateForEdit(record: ExchangeRateDto): void {
    console.log(record);
    this.router.navigate(['/exchangeAdd'], { queryParams: { data: JSON.stringify(record) } });
  }

  addNewExchangeRate(): void {
    // Navega al componente de adición sin pasar datos
    this.router.navigate(['/exchangeAdd']);
  }

  @Input() flag: boolean = false;
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

}


