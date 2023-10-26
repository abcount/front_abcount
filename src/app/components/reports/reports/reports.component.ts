import { Component } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  subsidiaries: any[] = [];
  areas: any[] = [];
  currencies: any[] = [];
  accountPlan: any[] = [];

  constructor(private configurationService: ConfigurationService) { }

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

  diaryBookFlag: boolean = false;
  diaryBookFlagChange() {
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
