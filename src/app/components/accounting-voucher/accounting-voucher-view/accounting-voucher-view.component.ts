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

  currentVoucherIndex: number = 0;
  comprobantes: any[] = [];
 

  constructor(private configurationService: ConfigurationService, private transactionService: TransactionService, private dialog: MatDialog, private route: Router) { }

  // Función inicial
  ngOnInit(){
    this.loadVouncherData();
    this.addEmptyRow();
  }

  // Función para cargar los datos del voucher
  loadVouncherData(){
    this.transactionService.getVoucherData().subscribe(response => {
      if (response.success) {
        if(response.data.currencies.length == 0 ||
          response.data.subsidiaries.length == 0 || 
          response.data.areas.length == 0 || 
          response.data.transactionType.length == 0){
            //TODO: separar logica y mostrar mensaje en caso de que la lista de monedas llegue vacia.
          if(response.data.currencies.length == 0){
            const currencyMessage = this.dialog.open(MessageDialogComponent, {
              disableClose: true,
              width: '300px',
              data: {
                title: 'Ocurrio un error!', 
                message: "No tiene registro de monedas del día. Por favor, registre las monedas del día"}
            });
            
            currencyMessage.afterClosed().subscribe(() => {
              this.route.navigate(['/exchangeAdd']);
            })

          }else{
            const message = this.dialog.open(MessageDialogComponent, {
              disableClose: true,
              data: {
                title: 'Ocurrio un error!', 
                message: "Ocurrio un error con el servidor"}
            });
            message.afterClosed().subscribe(() => {
              this.route.navigate(['/accounting-voucher/view']);
            })
          }
          
        }else{
          const data = response.data;
          console.log("Load voucher data")
          console.log(data)
          // Llenando la información de la cabecera
          this.companyName = data.companyName;
          this.sucursales = data.subsidiaries.map((subsidiary: {subsidiaryId: any; subsidiaryName: any; }) => ({id: subsidiary.subsidiaryId, name: subsidiary.subsidiaryName}));
          this.subsidiarySelect = data.subsidiaries[0].subsidiaryId;
          this.areas = data.areas.map((area: { areaId: any, areaName: any; }) => ({id: area.areaId, name: area.areaName}));
          this.areaSelect = data.areas[0].areaId;
          this.documentos = data.transactionType.map((transactionType: { transactionTypeId: any, type: any; }) => ({id: transactionType.transactionTypeId, name: transactionType.type}));
          this.documentSelect = data.transactionType[0].transactionTypeId;
          const subsidiaryId = data.subsidiaries[0].subsidiaryId;
          const areaId = data.areas[0].areaId;
          const transactionTypeId = data.transactionType[0].transactionTypeId;
          this.transactionService.getListTransaction(subsidiaryId,areaId,transactionTypeId).subscribe(response => {
            const data = response.data;
            this.comprobantes = data;
            if(this.comprobantes.length > 0) {
                this.currentVoucherIndex = 0;
                this.loadVoucherByIndex();
            }
          });
        }
      }
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
      if (this.currentVoucherIndex < this.comprobantes.length - 1) {
        this.currentVoucherIndex++;
      }
    } else {
      if (this.currentVoucherIndex > 0) {
        this.currentVoucherIndex--;
      }
    }
    this.loadVoucherByIndex();
  }
  loadVoucherByIndex() {
    const currentVoucher = this.comprobantes[this.currentVoucherIndex];
    this.fecha = currentVoucher.date;
    this.numComprobante = currentVoucher.transactionNumber;
    this.glosa = currentVoucher.glosaGeneral;
    this.totalDebe = currentVoucher.totalDebit;
    this.totalHaber = currentVoucher.totalCredit;
    this.monedas = [{id: currentVoucher.currency.exchangeRateId, name: currentVoucher.currency.moneyName, abbreviation: currentVoucher.currency.abbreviationName}];
    this.listTransactionAccount = currentVoucher.transactions.map((tx: any) => {
      return {
        numeroCuenta: tx.accountCode,
        nombreCuenta: tx.nameAccount,
        auxiliar: tx.codeAccount,
        entidad: tx.entityName,
        debe: tx.amountDebit,
        haber: tx.amountCredit,
        glosa: tx.glosaDetail,
        nroDoc: tx.documentCode,
      }
    });
  }
}

interface Row {
  numeroCuenta: string;
  nombreCuenta: string;
  auxiliarId?: number;
  auxiliar: string;
  entidad: string;
  debe: string;
  haber: string;
  glosa: string;
  nroDoc: string;
  fechaEmision: string;
}