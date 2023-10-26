import { Component, EventEmitter, Input, Output } from '@angular/core';
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
 
  //Constructor
  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() { }

  @Input() flag: boolean = false;
  @Input() subsidiaries: any[] = [];
  @Input() areas: any[] = [];
  @Input() currencies: any[] = [];
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
    const sucursalesId = this.subsidiaries.filter (subsidiary => subsidiary.isChecked).map(subsidiary => subsidiary.subsidiaryId);
    console.log(sucursalesId);
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
