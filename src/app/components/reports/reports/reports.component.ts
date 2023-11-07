import { Component } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  subsidiaries: any[] = [];
  areas: any[] = [];
  transactionTypes = [
    {"transactionTypeId": 3,"transactionTypeName": "Egreso"},
    {"transactionTypeId": 4,"transactionTypeName": "Traspaso"},
  ];
  currencies: any[] = [];
  principalCurrency: any = '';
  otherCurrencySelected: string = '0';
  accountPlan: any[] = [];

  accountPlanBalanceSheet: any[] = [];

  constructor(private configurationService: ConfigurationService, private dataService: DataService) { }

  ngOnInit() {
    this.configurationService.getSubsidiaries().subscribe(
      (data: any) => {
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
    this.dataService.getExchangeMoney().subscribe((data: any) => {
      //console.log(data);
      this.currencies = data.data;
      this.principalCurrency = this.currencies[0];
      this.currencies.splice(0, 1);
      if (this.currencies.length > 0) {
        this.otherCurrencySelected = this.currencies[0].abbreviationName;
      }
    });
    this.configurationService.getAccountsPlan().subscribe(
      (data: any) => {
        this.accountPlan = data.data;
        this.accountPlan.forEach((element) => {
          element.isChecked = false;
        });
        this.accountPlanBalanceSheet = data.data.filter((element: any) => element.report == false);
      }
    );
  }

  diaryBookFlag: boolean = false;
  diaryBookFlagChange() {
    this.resetChecks();
    this.diaryBookFlag = !this.diaryBookFlag;
  }

  generalLedgerFlag: boolean = false;
  generalLedgerFlagChange() {
    this.resetChecks();
    this.generalLedgerFlag = !this.generalLedgerFlag;
  }

  balanceSheetFlag: boolean = false;
  balanceSheetFlagChange() {
    this.resetChecks();
    this.balanceSheetFlag = !this.balanceSheetFlag;
  }

  statementOfIncomeFlag: boolean = false;
  statementOfIncomeFlagChange() {
    this.resetChecks();
    this.statementOfIncomeFlag = !this.statementOfIncomeFlag;
  }

  BalanceCheckSumsAndBalances: boolean = false;
  BalanceCheckSumsAndBalancesChange() {
    this.resetChecks();
    this.BalanceCheckSumsAndBalances = !this.BalanceCheckSumsAndBalances;
  }

  resetChecks(){
    this.subsidiaries.forEach((element) => {
      element.isChecked = false;
    });
    this.areas.forEach((element) => {
      element.isChecked = false;
    });
    this.resetAccountPlan(this.accountPlan);
  }

  resetAccountPlan(accounts: any[]) {
    accounts.forEach((element) => {
      element.isChecked = false;
      if (element.childrenAccounts.length > 0) {
        this.resetAccountPlan(element.childrenAccounts);
      }
    });
  }
}
