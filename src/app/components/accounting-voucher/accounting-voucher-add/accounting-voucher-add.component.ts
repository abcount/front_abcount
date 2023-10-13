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
  accountablePlan: any[] = [];  // para guardar las cuentas del JSON
filteredAccounts: any[] = [];  // para guardar las cuentas filtradas
showDropdown: boolean = false;  // para mostrar/ocultar el dropdown
searchSubject = new Subject<string>();

  hojas: any[] = [this.nuevaHoja()];
  hojaActual: number = 0;
  totalDebe: number = 0;
  totalHaber: number = 0;
  editingRowIndex: number | null = null;

  diferencia: number = 0;

  transactionNumber: number = 0;
  sucursales: string[] = [];
  areas: string[] = [];
  documentos: string[] = [];
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

  constructor(private transactionService: TransactionService
    ) {
      this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
        if (value) {
            this.filteredAccounts = this.accountablePlan.filter(account => account.accountCode.includes(value));
            this.showDropdown = this.filteredAccounts.length > 0;
        } else {
            this.showDropdown = false;
        }
    });

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
  ngOnInit(){
    this.loadVoucherData();
    this.calcularTotales();
  }


  loadVoucherData() {
    this.transactionService.getVoucherData(1).subscribe(response => {
      if (response.success) {
        const data = response.data;
  
        // Llenando la información de la cabecera
        this.hoja.empresa = data.companyName;
  
        this.hoja.empresa = data.companyName;  
        this.sucursales = data.subsidiaries.map((subsidiary: { subsidiaryName: any; }) => subsidiary.subsidiaryName);
        this.areas = data.areas.map((area: { areaName: any; }) => area.areaName);
        this.documentos = data.transactionType.map((transactionType: { type: any; }) => transactionType.type);
        this.monedas = data.currencies.map((currency: { moneyName: any; }) => currency.moneyName);
        this.hoja.numComprobante= data.transactionNumber;        
        // Estableciendo el primer elemento de cada array como predeterminado en hoja
        this.accountablePlan = data.accountablePlan;  // guardamos las cuentas en la propiedad

        if (this.sucursales.length > 0) {
          this.hoja.sucursal = this.sucursales[0];
        }
        if (this.areas.length > 0) {
          this.hoja.area = this.areas[0];
        }
        if (this.documentos.length > 0) {
          this.hoja.documento = this.documentos[0];
        }
        if (this.monedas.length > 0) {
          this.hoja.moneda = this.monedas[0];
        }
      }
    });
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


hideDropdown() {
  this.showDropdown = false;
  this.editingRowIndex = null;  // resetear el valor
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