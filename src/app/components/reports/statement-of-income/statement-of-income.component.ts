import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ReportService} from 'src/app/services/report.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-statement-of-income',
  templateUrl: './statement-of-income.component.html',
  styleUrls: ['./statement-of-income.component.css']
})
export class StatementOfIncomeComponent {

  //Constructor
  constructor(private router: Router, private configurationService: ConfigurationService, private reportSerive: ReportService, private sanitizer: DomSanitizer) { }

  ngOnInit() { }

  @Input() flag: boolean = false;
  @Input() subsidiaries: any[] = [];
  @Input() areas: any[] = [];
  @Input() currencies: any[] = [];
  @Input() principalCurrency: any = '';
  @Input() otherCurrencySelected: string = '0';
  @Output() flagChange = new EventEmitter<boolean>();

  closeModal() {
    this.name = [];
    this.flag = false;
    this.flagChange.emit(this.flag);
  }

  dateFrom: string = '';
  dateTo: string = '';
  currencySelected: string = '0';
  @ViewChild('errorMessage') errorMessage: ElementRef;
  errorMessageText: string = 'Por favor, seleccione al menos una sucursal.';
  name: string[] = [];

  generatePdf(){
    const sucursalesId = this.subsidiaries.filter (subsidiary => subsidiary.isChecked).map(subsidiary => subsidiary.subsidiaryId);
    if (sucursalesId.length > 0) {
      const areasId = this.areas.filter(area => area.isChecked).map(area => area.areaId);
      if (areasId.length > 0) {
        if (this.dateFrom != '' && this.dateTo != '') {
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
            from: this.dateFrom,
            to: this.dateTo,
            currencies: currencyId,
            responsible: names
          }
          console.log(data);
          //Logica Para Generar reporte
          this.reportSerive.statementIncomePDF(data).subscribe((response: any) => {
            if (response.success) {
              console.log(response);
              window.open(response.data, '_blank');
            } else {
              console.error('Error al enviar datos al backend', response.errors);
            }
          });
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
}