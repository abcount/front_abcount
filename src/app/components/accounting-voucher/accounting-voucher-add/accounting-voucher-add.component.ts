import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-accounting-voucher-add',
  templateUrl: './accounting-voucher-add.component.html',
  styleUrls: ['./accounting-voucher-add.component.css']
})
export class AccountingVoucherAddComponent {

  // Variables
  companyName: string = '';
  sucursales: string[] = [];
  areas: string[] = [];
  documentos: string[] = [];
  fecha: string;
  numComprobante: number = 0;
  accountablePlan: any[] = [];
  glosa: string = '';

  // Constructor
  constructor(private transactionService: TransactionService) {
    this.fecha = new Date().toISOString().substring(0, 10);
  }

  // Función inicial
  ngOnInit(){
    this.loadVoucherData();
    this.calcularTotales();
  }

  // Función para cargar los datos del voucher
  loadVoucherData() {
    this.transactionService.getVoucherData(1).subscribe(response => {
      if (response.success) {
        const data = response.data;
        // Llenando la información de la cabecera
        this.companyName = data.companyName; 
        this.sucursales = data.subsidiaries.map((subsidiary: {subsidiaryId: any; subsidiaryName: any; }) => ({id: subsidiary.subsidiaryId, name: subsidiary.subsidiaryName}));
        this.areas = data.areas.map((area: { areaId: any, areaName: any; }) => ({id: area.areaId, name: area.areaName}));
        this.documentos = data.transactionType.map((transactionType: { transactionTypeId: any, type: any; }) => ({id: transactionType.transactionTypeId, name: transactionType.type}));
        this.monedas = data.currencies.map((currency: { exchangeMoneyId: any; moneyName: any; }) => ({id: currency.exchangeMoneyId, name: currency.moneyName}));
        this.numComprobante= data.transactionNumber;        
        // Obteniendo las cuentas
        this.accountablePlan = data.accountablePlan;
      }
    });
  }

  // Selects
  subsidiarySelect: number;
  areaSelect: number;
  documentSelect: number;
  currencySelect: number;

  subsidiarySelected(subsidiary: any) {
    this.subsidiarySelect = subsidiary.id;
    console.log("Sucursal id: "+this.subsidiarySelect);
  }
  areaSelected(area: any) {
    this.areaSelect = area.id;
    console.log("Area id: "+this.areaSelect);
  }
  documentSelected(document: any) {
    this.documentSelect = document.id;
    console.log("Documento id: "+this.documentSelect);
  }
  currencySelected(currency: any) {
    this.currencySelect = currency.id;
    console.log("Moneda id: "+this.currencySelect);
  }



  filteredAccounts: any[][] = [];  // para guardar las cuentas filtradas

  // Para filtrar las cuentas
  filterAccountsFunction(i: number){
    this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
      if (value) {
          this.filteredAccounts[i] = this.accountablePlan.filter(account => account.accountCode.includes(value));
          this.showDropdown = this.filteredAccounts.length > 0;
      } else {
          this.showDropdown = false;
      }
    });
  }




  showDropdown: boolean = false;  // para mostrar/ocultar el dropdown
  searchSubject = new Subject<string>();

  hojas: any[] = [this.nuevaHoja()];
  hojaActual: number = 0;
  totalDebe: number = 0;
  totalHaber: number = 0;
  editingRowIndex: number | null = null;

  diferencia: number = 0;

  transactionNumber: number = 0;
  monedas: string[] = [];

  nuevaHoja() {
    return {
      entradas: Array(10).fill({}).map(() => ({
        numeroCuenta: '',
        nombreCuenta: '',
        auxiliar: '',
        entidad: '',
        debe: 0,
        haber: 0,
        glosa: '',
        cheque: ''
      }))
    };
  }

  get hoja() {
    return this.hojas[this.hojaActual];
  }



  guardar() {
    const payload = {
      userId: 1002,
      subsidiaryId: this.sucursales.indexOf(this.hoja.sucursal) + 1,
      currencyId: this.monedas.indexOf(this.hoja.moneda) + 1,
      transactionTypeId: 1, // Este valor parece ser estático en tu ejemplo
      areaId: this.areas.indexOf(this.hoja.area) + 1,
      transactionNumber: 1,
      glosaGeneral: this.hoja.glosa,
      transactions: this.hoja.entradas.map((entrada: { numeroCuenta: any; debe: any; haber: any; glosa: any; cheque: any; }) => ({
        accountId: entrada.numeroCuenta,
        entityId: 200,  // No veo dónde especificas esta información en tu formulario
        auxiliaryId: 3001,  
        amountDebit: entrada.debe,
        amountCredit: entrada.haber,
        emitedDate: new Date().toISOString().split('T')[0],
        glosaDetail: entrada.glosa,
        documentCode: entrada.cheque
      })),
      totalDebit: this.totalDebe,
      totalCredit: this.totalHaber
    };
    console.log(payload);
    this.transactionService.createTransaction(payload).subscribe(response => {
      console.log(response);
    }, error => {
      console.error("Hubo un error al guardar la transacción", error);
    });
}



  navegar(direccion: string) {
    if (direccion === 'derecha') {
      this.hojaActual++;
      if (this.hojaActual >= this.hojas.length) {
        this.hojas.push(this.nuevaHoja());
      }
    } else if (direccion === 'izquierda' && this.hojaActual > 0) {
      this.hojaActual--;
    }
    this.calcularTotales();
  }

  navegarInputs(event: KeyboardEvent, rowIndex: number, columna: string) {
    const currentInput = event.target as HTMLElement;
    let nextInput: HTMLElement | null = null;

    if (!currentInput.parentElement || !currentInput.parentElement.parentElement) {
      return;
    }

    const currentRow = currentInput.parentElement.parentElement;

    switch (event.key) {
      case 'ArrowUp':
        if (rowIndex > 0 && currentRow.previousElementSibling) {
          nextInput = currentRow.previousElementSibling.querySelector(`input[name=${columna}]`);
        }
        break;
      case 'ArrowDown':
        if (rowIndex < this.hoja.entradas.length - 1 && currentRow.nextElementSibling) {
          nextInput = currentRow.nextElementSibling.querySelector(`input[name=${columna}]`);
        }
        break;
      case 'ArrowLeft':
        nextInput = currentInput.parentElement.previousElementSibling?.querySelector('input') || null;
        break;
      case 'ArrowRight':
        nextInput = currentInput.parentElement.nextElementSibling?.querySelector('input') || null;
        break;
    }

    if (nextInput) {
      nextInput.focus();
      event.preventDefault();
    }
  }

  calcularTotales() {
    this.totalDebe = this.hoja.entradas.reduce((acc: number, entrada: Entrada) => acc + entrada.debe, 0);
    this.totalHaber = this.hoja.entradas.reduce((acc: number, entrada: Entrada) => acc + entrada.haber, 0);
    this.diferencia = this.totalDebe - this.totalHaber;
  }


  filterAccounts(value: string, rowIndex: number) {
    this.editingRowIndex = rowIndex;
    this.searchSubject.next(value);
  }
  

selectAccount(account: any) {
  // Asumiendo que editingRowIndex es el índice actualmente en edición
  if (this.editingRowIndex !== null) {
    this.hoja.entradas[this.editingRowIndex].numeroCuenta = account.accountCode;
    this.hoja.entradas[this.editingRowIndex].nombreCuenta = account.nameAccount;
    this.showDropdown = false;  // ocultar el dropdown después de seleccionar
  }
}

hideDropdown(rowIndex: number) {
  this.showDropdown = false;
  this.editingRowIndex = null;  // resetear el valor
  this.filteredAccounts[rowIndex] = []; // Limpiar la lista filtrada específica para la fila
}

  



}


interface Entrada {
  numeroCuenta: string;
  nombreCuenta: string;
  auxiliar: string;
  entidad: string;
  debe: number;
  haber: number;
  glosa: string;
  cheque: string;
}