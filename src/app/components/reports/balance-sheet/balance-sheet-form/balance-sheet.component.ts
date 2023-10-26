import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent {

  //Listas de sucursales y areas
  subsidiaries: any[] = [];
  areas: any[] = [];
  currencies: any[] = [];
  accountPlan: any[] = [];

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
    this.configurationService.getAccountsPlan().subscribe(
      (data: any) => {
        this.accountPlan = data.data;
        this.accountPlan.forEach((element) => {
          element.isChecked = false;
        });
      }
    );
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
    const accountsPlanMarcadas = this.accountPlan.filter(account => account.isChecked);
    console.log(accountsPlanMarcadas);
  }

  generateExcel(){

  }

}
