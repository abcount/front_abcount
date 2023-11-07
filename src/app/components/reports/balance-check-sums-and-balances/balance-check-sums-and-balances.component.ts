import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-balance-check-sums-and-balances',
  templateUrl: './balance-check-sums-and-balances.component.html',
  styleUrls: ['./balance-check-sums-and-balances.component.css']
})
export class BalanceCheckSumsAndBalancesComponent {

  //Constructor
  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() { }

  @Input() flag: boolean = false;
  @Input() subsidiaries: any[] = [];
  @Input() areas: any[] = [];
  @Input() currencies: any[] = [];
  @Input() principalCurrency: any = '';
  @Input() otherCurrencySelected: string = '0';
  @Input() accountPlan: any[] = [];
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.name = [];
    this.flag = false;
    this.flagChange.emit(this.flag);
  }
  
  dateTo: string = '';
  currencySelected: string = '0';
  accountsChecked: any[] = [];
  name: string[] = [];
  @ViewChild('errorMessage') errorMessage: ElementRef;
  errorMessageText: string = 'Por favor, seleccione al menos una sucursal.';

  generatePdf(){
    const sucursalesId = this.subsidiaries.filter (subsidiary => subsidiary.isChecked).map(subsidiary => subsidiary.subsidiaryId);
    if (sucursalesId.length > 0) {
      const areasId = this.areas.filter(area => area.isChecked).map(area => area.areaId);
      if (areasId.length > 0) {
        this.accountsChecked = [];
        this.getAccountsPlanChecked(this.accountPlan);
        //console.log(this.accountsChecked);
        const accountsId = this.accountsChecked.map(account => account.accountId);
        if (this.accountsChecked.length>0) {
          if (this.dateTo != '') {
            var currencyId = '0';
            if (this.currencySelected == '0') {
              currencyId = this.principalCurrency.abbreviationName;
            } else {
              currencyId = this.otherCurrencySelected;
            }
            const names = this.name.filter((name: string) => {
              const nameSpace = name.trim();
              return nameSpace.length > 0;
            });
            const data = {
              subsidiaries: sucursalesId,
              areas: areasId,
              accountsId: accountsId,
              to: this.dateTo,
              currency: currencyId,
              responsible: names
            }
            console.log(data);
          } else {
            this.errorMessageText = 'Por favor, seleccione una fecha.';
            this.showErrorMessage();
          }
        } else {
          this.errorMessageText = 'Por favor, seleccione al menos una cuenta.';
          this.showErrorMessage();
        }
      } else {
        this.errorMessageText = 'Por favor, seleccione al menos un área.';
        this.showErrorMessage();
      }
    } else {
      this.errorMessageText = 'Por favor, seleccione al menos una sucursal.';
      this.showErrorMessage();
    }
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

  showErrorMessage() {
    this.errorMessage.nativeElement.classList.add('show');
    setTimeout(() => {
      this.errorMessage.nativeElement.classList.remove('show');
    }, 2500);
  }
}
