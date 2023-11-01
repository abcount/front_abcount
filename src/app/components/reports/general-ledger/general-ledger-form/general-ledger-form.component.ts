import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {ConfigurationService} from "../../../../services/configuration.service";

@Component({
  selector: 'app-general-ledger-form',
  templateUrl: './general-ledger-form.component.html',
  styleUrls: ['./general-ledger-form.component.css']
})

export class GeneralLedgerFormComponent {

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
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

  dateFrom: string = '';
  dateTo: string = '';
  currencySelected: string = '0';
  accountsChecked: any[] = [];
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
          if (this.dateFrom != '' && this.dateTo != '') {
            var currencyId = '0';
            if (this.currencySelected == '0') {
              currencyId = this.principalCurrency.exchangeMoneyId;
            } else {
              currencyId = this.otherCurrencySelected;
            }
            const data = {
              subsidiaries: sucursalesId,
              areas: areasId,
              from: this.dateFrom,
              to: this.dateTo,
              accountsId: accountsId,
              currency: currencyId
            }
            console.log(data);
          } else {
            this.errorMessageText = 'Por favor, ingrese un rango de fechas.';
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

  generateExcel() {
    this.sendDataToBackend();
  }

  sendDataToBackend() {
    const requestData = {
      subsidiaries: this.subsidiaries.filter(s => s.isChecked).map(s => s.subsidiaryId),
      areas: this.areas.filter(a => a.isChecked).map(a => a.areaId),
      from: this.dateFrom,
      to: this.dateTo,
      accountsId: this.accountsChecked.map(a => a.accountId),
      currencies: this.currencySelected
    };

    this.configurationService.sendData(requestData).subscribe((response: any) => {
      if (response.success) {
        this.loadData(response.data.subsidiaries);
      } else {
        console.error('Error al enviar datos al backend', response.errors);
      }
    });
  }

  loadData(subsidiaryData: any[]) {
    const formattedData = this.transformDataForExcel(subsidiaryData);
    this.proceedToGenerateExcel(formattedData);
  }

  transformDataForExcel(subsidiaries: any[]): any[] {
    const excelData:any = [];
    subsidiaries.forEach(subsidiary => {
      subsidiary.areas.forEach((area:any) => {
        area.accounts.forEach((account:any) => {
          account.transactions.forEach((transaction:any) => {
            const row = {
              Subsidiary: subsidiary.subsidiary,
              Area: area.area,
              AccountCode: account.accountCode,
              AccountName: account.accountName,
              VoucherCode: transaction.voucherCode,
              RegistrationDate: transaction.registrationDate,
              TransactionType: transaction.transactionType,
              GlosaDetail: transaction.glosaDetail,
              DocumentNumber: transaction.documentNumber,
              DebitAmount: transaction.debitAmount,
              CreditAmount: transaction.creditAmount,
              Balances: transaction.balances
            };
            excelData.push(row);
          });
        });
      });
    });
    return excelData;
  }
  proceedToGenerateExcel(data: any[]) {
    // Convertir datos a formato CSV
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.setAttribute('style', 'display:none;');
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', 'libro_mayor.csv');

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  }


  convertToCSV(data: any[]): string {
    let csv = '';

    // Encabezados
    const headers = Object.keys(data[0]);
    csv += headers.join(',') + '\n';

    // Contenido
    for (const row of data) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csv += values.join(',') + '\n';
    }

    return csv;
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
