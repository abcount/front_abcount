import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';
@Component({
  selector: 'app-balance-check-sums-and-balances',
  templateUrl: './balance-check-sums-and-balances.component.html',
  styleUrls: ['./balance-check-sums-and-balances.component.css']
})
export class BalanceCheckSumsAndBalancesComponent {

  //Constructor
  constructor(private router: Router, private configurationService: ConfigurationService) { }

  ngOnInit() { }

  @Input() flag: boolean = false;
  @Input() subsidiaries: any[] = [];
  @Input() areas: any[] = [];
  @Input() currencies: any[] = [];
  @Input() accountPlan: any[] = [];
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

  dateFrom: string = '';
  dateTo: string = '';
  principalCurrency: boolean = true;
  otherCurrency: boolean = false;
  accountsChecked: any[] = [];

  generatePdf(){
    const sucursalesMarcadas = this.subsidiaries.filter(subsidiary => subsidiary.isChecked);
    console.log(sucursalesMarcadas);
    const areasMarcadas = this.areas.filter(area => area.isChecked);
    console.log(areasMarcadas);
    console.log(this.dateFrom);
    console.log(this.dateTo);
    console.log(this.principalCurrency);
    console.log(this.otherCurrency);
    this.accountsChecked = [];
    this.getAccountsPlanChecked(this.accountPlan);
    console.log(this.accountsChecked);
  }

  generateExcel(){

  }

  getAccountsPlanChecked(accounts: any[]) {
    for(let i = 0; i < accounts.length; i++){
      if(accounts[i].isChecked){
        this.accountsChecked.push(accounts[i]);
      }
      if(accounts[i].childrenAccounts.length > 0){
        this.getAccountsPlanChecked(accounts[i].childrenAccounts);
      }
    }
  }
}
