import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-diary-book-form',
  templateUrl: './diary-book-form.component.html',
  styleUrls: ['./diary-book-form.component.css']
})
export class DiaryBookFormComponent {

  transactionTypes = [
    {"transactionTypeId": 1,"transactionTypeName": "Ingreso"},
    {"transactionTypeId": 2,"transactionTypeName": "Egreso"},
    {"transactionTypeId": 3,"transactionTypeName": "Traspaso"},
  ];

  //Listas de sucursales y areas
  subsidiaries: any[] = [];
  areas: any[] = [];
  currencies: any[] = [];
 
  //Constructor
  constructor(private router: Router, private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.configurationService.getSubsidiaries().subscribe(
      (data: any) => {
        //console.log(data);
        this.subsidiaries = data.data.subsidiaries;
        this.subsidiaries.forEach((element) => {
          element.isChecked = false;
        });
        this.areas = data.data.areas;
        this.areas.forEach((element) => {
          element.isChecked = false;
        });
      }
    );
    this.configurationService.getCurrencies().subscribe((data: any) => {
      //console.log(data);
      this.currencies = data.data.currencyConfig;
      this.currencies.splice(0, 1);
    });
  }

  @Input() flag: boolean = false;
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

  dateFrom: string = '';
  dateTo: string = '';
  selectedTransactionType: string = '0';
  principalCurrency: boolean = true;
  otherCurrency: boolean = false;

  generatePdf(){
    const sucursalesMarcadas = this.subsidiaries.filter(subsidiary => subsidiary.isChecked);
    console.log(sucursalesMarcadas);
    const areasMarcadas = this.areas.filter(area => area.isChecked);
    console.log(areasMarcadas);
    console.log(this.dateFrom);
    console.log(this.dateTo);
    console.log(this.selectedTransactionType);
    console.log(this.principalCurrency);
    console.log(this.otherCurrency);
  }

  generateExcel(){

  }

  onTransactionTypeChange(event: any) {
    this.selectedTransactionType = event.target.value;
  }
}
