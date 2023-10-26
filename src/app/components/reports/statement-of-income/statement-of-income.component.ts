import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';


@Component({
  selector: 'app-statement-of-income',
  templateUrl: './statement-of-income.component.html',
  styleUrls: ['./statement-of-income.component.css']
})
export class StatementOfIncomeComponent {
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
  principalCurrency: boolean = true;
  otherCurrency: boolean = false;

  generatePdf(){
    const sucursalesMarcadas = this.subsidiaries.filter(subsidiary => subsidiary.isChecked);
    console.log(sucursalesMarcadas);
    const areasMarcadas = this.areas.filter(area => area.isChecked);
    console.log(areasMarcadas);
    console.log(this.dateFrom);
    console.log(this.dateTo);
    console.log(this.principalCurrency);
    console.log(this.otherCurrency);
  }

  generateExcel(){

  }


}
