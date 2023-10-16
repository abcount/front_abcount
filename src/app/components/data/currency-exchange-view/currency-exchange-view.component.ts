import { Component } from '@angular/core';
import {ExchangeRateDto} from "../../../dto/exchangeRate.dto";
import {DataService} from "../../../services/data.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-currency-exchange-view',
  templateUrl: './currency-exchange-view.component.html',
  styleUrls: ['./currency-exchange-view.component.css']
})
export class CurrencyExchangeViewComponent {
  data = new MatTableDataSource<ExchangeRateDto>();
  displayedColumns: string[] = [];
  allColumns: string[] = [];




selectedRecord?: ExchangeRateDto;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getExchangeRate();
  }

  getExchangeRate(): void {
    console.log("Llamando a getExchangeRate");
    this.dataService.getExchangeRates().subscribe(response => {
      console.log("Respuesta del servidor:", response);
      this.data.data = response.data;
      console.log("Data actualizada:", this.data.data);
      if (this.data.data && this.data.data.length > 0) {
        console.log('Antes:', this.displayedColumns);
        this.displayedColumns = Object.keys(this.data.data[0].values);
        this.allColumns = ['date', ...this.displayedColumns, 'actions'];
        console.log('Después:', this.displayedColumns);
      }
    }, error => {
      console.error('Error fetching exchange rates', error);
    });
  }


  deleteExchangeRate(record: ExchangeRateDto): void {
    console.log(record);
    this.dataService.deleteExchangeRate(record).subscribe(() => {
      this.data.data = this.data.data.filter(item => item.id !== record.id);
    }, error => {
      console.error('Error deleting exchange rate', error);
    });
  }



  loadExchangeRateForEdit(record: ExchangeRateDto): void {
    console.log(record);
    this.router.navigate(['/exchangeAdd'], { queryParams: { data: JSON.stringify(record) } });
  }

  addNewExchangeRate(): void {
    // Navega al componente de adición sin pasar datos
    this.router.navigate(['/exchangeAdd']);
  }



}


