import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-diary-book-form',
  templateUrl: './diary-book-form.component.html',
  styleUrls: ['./diary-book-form.component.css']
})
export class DiaryBookFormComponent {
 
  //Constructor
  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() { }

  @Input() flag: boolean = false;
  @Input() subsidiaries: any[] = [];
  @Input() areas: any[] = [];
  @Input() transactionTypes: any[] = [];
  @Input() currencies: any[] = [];
  @Input() principalCurrency: any = '';
  @Input() otherCurrencySelected: string = '0';
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

  dateFrom: string = '';
  dateTo: string = '';
  selectedTransactionType: string = '0';
  currencySelected: string = '0';
  @ViewChild('errorMessage') errorMessage: ElementRef;
  errorMessageText: string = 'Por favor, seleccione al menos una sucursal.';

  generatePdf(){
    const sucursalesId = this.subsidiaries.filter (subsidiary => subsidiary.isChecked).map(subsidiary => subsidiary.subsidiaryId);
    if (sucursalesId.length > 0) {
      const areasId = this.areas.filter(area => area.isChecked).map(area => area.areaId);
      if (areasId.length > 0) {
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
            transactionType: this.selectedTransactionType,
            currency: currencyId
          }
          console.log(data);
        } else {
          this.errorMessageText = 'Por favor, ingrese un rango de fechas.';
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

  showErrorMessage() {
    this.errorMessage.nativeElement.classList.add('show');
    setTimeout(() => {
      this.errorMessage.nativeElement.classList.remove('show');
    }, 2500);
  }

  onTransactionTypeChange(event: any) {
    this.selectedTransactionType = event.target.value;
  }
}
