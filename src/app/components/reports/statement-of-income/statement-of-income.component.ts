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

  //Constructor
  constructor(private router: Router, private configurationService: ConfigurationService) { }

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