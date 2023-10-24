import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transaction.service';
import { MessageDialogComponent } from '../../general-components/message.dialog/message.dialog.component';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-accounting-voucher-view',
  templateUrl: './accounting-voucher-view.component.html',
  styleUrls: ['./accounting-voucher-view.component.css']
})
export class AccountingVoucherViewComponent {

  // Variables
  companyName: string = '';
  sucursales: any[] = [{id: '', name: ''}];
  areas: any[] = [{id: '', name: ''}];
  documentos: any[] = [{id: '', name: ''}];
  fecha: string = '';
  numComprobante: number = 0;
  monedas: any[] = [{id: '', name: ''}];
  glosa: string = '';
  listTransactionAccount: Row[] = [];
  totalDebe: number = 0;
  totalHaber: number = 0;

  constructor(private configurationService: ConfigurationService, private transactionService: TransactionService, private dialog: MatDialog, private route: Router) { }

  // Función inicial
  ngOnInit(){
    this.loadVouncherData();
    this.addEmptyRow();
  }

  // Función para cargar los datos del voucher
  loadVouncherData(){
    this.configurationService.getSubsidiaries().subscribe(
      (data: any) => {
        if (data.data.subsidiaries.length != 0) {
          this.sucursales = data.data.subsidiaries.map((subsidiary: {subsidiaryId: any; subsidiaryName: any;}) => ({id: subsidiary.subsidiaryId, name: subsidiary.subsidiaryName}));
          this.subsidiarySelect = this.sucursales[0].id;
        }
        if (data.data.areas.length != 0) {
          this.areas = data.data.areas.map((area: {areaId: any; areaName: any;}) => ({id: area.areaId, name: area.areaName}));
          this.areaSelect = this.areas[0].id;
        }
      }
    );
    this.transactionService.getVoucherData().subscribe(response => {
      const data = response.data;
      this.documentos = data.transactionType.map((transactionType: { transactionTypeId: any, type: any; }) => ({id: transactionType.transactionTypeId, name: transactionType.type}));
      this.documentSelect = this.documentos[0].id;
    });
  }

  // Función para agregar una fila vacía
  addEmptyRow(){
    const counter = this.listTransactionAccount.length;
    if (counter < 10) {
      for(let i = 0; i < 10-counter; i++){
        const row: Row = {
          numeroCuenta: '',
          nombreCuenta: '',
          auxiliar: '',
          entidad: '',
          debe: '',
          haber: '',
          glosa: '',
          nroDoc: '',
          fechaEmision: ''
        };
        this.listTransactionAccount.push(row);
      }
    }
  }

  // Selects
  subsidiarySelect: number;
  areaSelect: number;
  documentSelect: number;
  currencySelect: number;

  subsidiarySelected(subsidiary: any) {
    this.subsidiarySelect = subsidiary.id;
    //console.log("Sucursal id: "+this.subsidiarySelect);
  }
  areaSelected(area: any) {
    this.areaSelect = area.id;
    //console.log("Area id: "+this.areaSelect);
  }
  documentSelected(document: any) {
    this.documentSelect = document.id;
    //console.log("Documento id: "+this.documentSelect);
  }
  currencySelected(currency: any) {
    this.currencySelect = currency.id;
    //console.log("Moneda id: "+this.currencySelect);
  }


  navegar(direccion: string) {
    if (direccion === 'derecha') {
      
    } else {

    }
    console.log("Navegar: "+direccion);
  }

}

interface Row {
  numeroCuenta: string;
  nombreCuenta: string;
  auxiliar: string;
  entidad: string;
  debe: string;
  haber: string;
  glosa: string;
  nroDoc: string;
  fechaEmision: string;
}