import { Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  diaryBookFlag: boolean = false;
  diaryBookFlagChange() {
    this.diaryBookFlag = !this.diaryBookFlag;
  }

  generalLedgerFlag: boolean = false;
  generalLedgerFlagChange() {
    this.generalLedgerFlag = !this.generalLedgerFlag;
  }

  balanceSheetFlag: boolean = false;
  balanceSheetFlagChange() {
    this.balanceSheetFlag = !this.balanceSheetFlag;
  }

  statementOfIncomeFlag: boolean = false;
  statementOfIncomeFlagChange() {
    this.statementOfIncomeFlag = !this.statementOfIncomeFlag;
  }

}
