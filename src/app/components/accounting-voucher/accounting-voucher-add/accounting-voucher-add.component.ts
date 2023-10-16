import { Component } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionAccountDto } from 'src/app/dto/transaction-account.dto';
import { AuxiliarDto } from 'src/app/dto/auxiliar.dto';
import { EntityDto } from 'src/app/dto/entity.dto';

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
  monedas: string[] = [];
  accountablePlan: any[] = [];
  glosa: string = '';

  listTransactionAccount: TransactionAccountDto[] = [];
  listaEntradas: Entrada[] = [];
  listAuxiliares: AuxiliarDto[] = [
    {auxiliarAccountId: 1, codeAccount: '1001', nameDescription: 'Caja'},
    {auxiliarAccountId: 2, codeAccount: '1002', nameDescription: 'Banco'},
    {auxiliarAccountId: 3, codeAccount: '1003', nameDescription: 'Cuentas por cobrar'},
    {auxiliarAccountId: 4, codeAccount: '1004', nameDescription: 'Mercaderías'},
    {auxiliarAccountId: 5, codeAccount: '1005', nameDescription: 'Inmuebles, maquinaria y equipo'},
    {auxiliarAccountId: 6, codeAccount: '1006', nameDescription: 'Terrenos'},
    {auxiliarAccountId: 7, codeAccount: '1007', nameDescription: 'Acciones y participaciones'},
    {auxiliarAccountId: 8, codeAccount: '1008', nameDescription: 'Inversiones financieras'},
    {auxiliarAccountId: 9, codeAccount: '1009', nameDescription: 'Cuentas por cobrar diversas'},
    {auxiliarAccountId: 10, codeAccount: '1010', nameDescription: 'Documentos por cobrar'},
    {auxiliarAccountId: 11, codeAccount: '1011', nameDescription: 'Anticipos a proveedores'},
    {auxiliarAccountId: 12, codeAccount: '1012', nameDescription: 'Anticipos a empleados'},
  ];
  listEntities: EntityDto[] = [
    {entityId: 1, entityName: 'Empresa 1', entityNit: '123456789', entitySocialReason: 'Empresa 1', foreign: false},
    {entityId: 2, entityName: 'Empresa 2', entityNit: '123456789', entitySocialReason: 'Empresa 2', foreign: false},
    {entityId: 3, entityName: 'Empresa 3', entityNit: '123456789', entitySocialReason: 'Empresa 3', foreign: false},
    {entityId: 4, entityName: 'Empresa 4', entityNit: '123456789', entitySocialReason: 'Empresa 4', foreign: false},
    {entityId: 5, entityName: 'Compañia 5', entityNit: '123456789', entitySocialReason: 'Compañia 5', foreign: false},
    {entityId: 6, entityName: 'Compañia 6', entityNit: '123456789', entitySocialReason: 'Compañia 6', foreign: false},
    {entityId: 7, entityName: 'Compañia 7', entityNit: '123456789', entitySocialReason: 'Empresa 7', foreign: false},
  ];

  // Constructor
  constructor(private transactionService: TransactionService) {
    this.fecha = new Date().toISOString().substring(0, 10);
  }

  // Función inicial
  ngOnInit(){
    this.loadVoucherData();
    for (let i = 0; i < 10; i++) {
      const emptyEntrada: Entrada = {
        cuentaId: 0,
        numeroCuenta: '',
        nombreCuenta: '',
        cuentaValida: false,
        auxiliar: '',
        auxiliarAccountId: 0,
        entidad: '',
        entityId: 0,
        debe: '',
        haber: '',
        glosa: '',
        nroDoc: '',
        fechaEmision: ''
      };
      this.listaEntradas.push(emptyEntrada);
      this.filteredAccounts.push([]);
      this.filteredAuxiliares.push([]);
      this.filteredEntities.push([]);
    }
    //this.calcularTotales();
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
        // Obteniendo los auxiliares
        //this.listAuxiliares = data.auxiliar;
        // Obteniendo las entidades
        //this.listEntities = data.entities;
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

  //-------------------------------------------------------------------------------------------------------
  // Lógica para el filtrado de cuentas
  filteredAccounts: any[][] = [];

  // Función para filtrar cuentas
  filterAccountsFunction(rowIndex: number) {
    const value = this.listaEntradas[rowIndex].numeroCuenta;
    this.filteredAccounts[rowIndex] = [];
    if (value && value.length > 0) {
      this.filteredAccounts[rowIndex] = this.accountablePlan.filter((account: { accountCode: string }) => account.accountCode.includes(value));
      if (this.filteredAccounts[rowIndex].length == 0) {
        this.resetAccount(rowIndex);
      }
    } else {
      this.resetAccount(rowIndex);
    }
  }

  // Restablecer la información de la cuenta
  resetAccount(rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    entry.cuentaId = 0;
    entry.nombreCuenta = '';
    entry.cuentaValida = false;
    this.filteredAccounts[rowIndex] = [];
  }

  // Comprobar si la lista de cuentas filtradas está vacía y si la cuenta no es válida
  isFilteredAccountsEmpty(rowIndex: number): boolean {
    return this.filteredAccounts[rowIndex] && this.filteredAccounts[rowIndex].length === 0 && !this.listaEntradas[rowIndex].cuentaValida;
  }

  // Ocultar el listado de cuentas con un retraso
  delayedHideDropdownAccount(rowIndex: number) {
    setTimeout(() => {
      this.hideDropdownAccount(rowIndex);
    }, 200);
  }

  // Ocultar el listado de cuentas
  hideDropdownAccount(rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    const filteredAccounts: any[] = this.filteredAccounts[rowIndex];
    if (entry.numeroCuenta != '' && filteredAccounts.length == 1) {
      entry.cuentaId = filteredAccounts[0].accountId;
      entry.numeroCuenta = filteredAccounts[0].accountCode;
      entry.nombreCuenta = filteredAccounts[0].nameAccount;
      entry.cuentaValida = true;
    } else if (entry.nombreCuenta == '' && filteredAccounts.length == 0) {
      entry.cuentaValida = false;
    }
    this.filteredAccounts[rowIndex] = [];
    console.log(this.listaEntradas[rowIndex]);
  }

  // Seleccionar una cuenta
  selectedAccount(account: any, rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    entry.cuentaId = account.accountId;
    entry.numeroCuenta = account.accountCode;
    entry.nombreCuenta = account.nameAccount;
    entry.cuentaValida = true;
    this.filteredAccounts[rowIndex] = [];
    const auxiliarInput = this.getAuxiliarInputInRow(rowIndex);
    if (auxiliarInput) {
      auxiliarInput.focus();
    }
  }
  getAuxiliarInputInRow(rowIndex: number): HTMLInputElement | null {
    const currentRow = this.getRowElement(rowIndex);
    if (currentRow) {
      return currentRow.querySelector('input[name="auxiliar"]') as HTMLInputElement;
    }
    return null;
  }
  
  //-------------------------------------------------------------------------------------------------------
  // Logica el filtro de las cuentas auxiliares
  filteredAuxiliares: any[] = [];

  // Función para filtrar cuentas auxiliares
  filterAuxiliarFunction(rowIndex: number) {
    const value = this.listaEntradas[rowIndex].auxiliar;
    this.filteredAuxiliares[rowIndex] = [];
    if (value && value.length > 0) {
      this.filteredAuxiliares[rowIndex] = this.listAuxiliares.filter((auxiliar: { codeAccount: string }) => auxiliar.codeAccount.includes(value));
      console.log(this.filteredAuxiliares[rowIndex]);
      if (this.filteredAuxiliares[rowIndex].length == 0) {
        this.resetAuxiliar(rowIndex);
      }
    } else {
      this.resetAuxiliar(rowIndex);
    }
  }

  // Restablecer la información del auxiliar
  resetAuxiliar(rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    entry.auxiliarAccountId = 0;
    this.filteredAuxiliares[rowIndex] = [];
  }

  // Comprobar si la lista de auxiliares filtrados está vacía
  isFilteredAuxiliarEmpty(rowIndex: number): boolean {
    return this.filteredAuxiliares[rowIndex] && this.filteredAuxiliares[rowIndex].length == 0 && this.listaEntradas[rowIndex].auxiliarAccountId == 0;
  }

  // Ocultar el listado de auxiliares con un retraso
  delayedHideDropdownAuxiliar(rowIndex: number) {
    setTimeout(() => {
      this.hideDropdownAuxiliar(rowIndex);
    }, 200);
  }

  // Ocultar el listado de auxiliares
  hideDropdownAuxiliar(rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    const filteredAuxiliares: any[] = this.filteredAuxiliares[rowIndex];
    if (filteredAuxiliares.length == 1) {
      entry.auxiliar = filteredAuxiliares[0].codeAccount;
      entry.auxiliarAccountId = filteredAuxiliares[0].auxiliarAccountId;
    } else if (entry.auxiliar == '' && filteredAuxiliares.length == 0) {
      entry.auxiliarAccountId = 0;
    } else if (filteredAuxiliares.length > 1) {
      entry.auxiliarAccountId = 0;
    }
    this.filteredAuxiliares[rowIndex] = [];
    console.log(this.listaEntradas[rowIndex]);
  }

  // Seleccionar un auxiliar
  selectedAuxiliar(auxiliar: any, rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    entry.auxiliar = auxiliar.codeAccount;
    entry.auxiliarAccountId = auxiliar.auxiliarAccountId;
    this.filteredAuxiliares[rowIndex] = [];
    const entityInput = this.getEntityInputInRow(rowIndex);
    if (entityInput) {
      entityInput.focus();
    }
  }
  getEntityInputInRow(rowIndex: number): HTMLInputElement | null {
    const currentRow = this.getRowElement(rowIndex);
    if (currentRow) {
      return currentRow.querySelector('input[name="entidad"]') as HTMLInputElement;
    }
    return null;
  }

  //-------------------------------------------------------------------------------------------------------
  // Logica para las entidades
  filteredEntities: any[] = [];

  // Función para filtrar entidades en base a su nombre
  filterEntityFunction(rowIndex: number) {
    const value = this.listaEntradas[rowIndex].entidad;
    this.filteredEntities[rowIndex] = [];
    if (value && value.length > 0) {
      this.filteredEntities[rowIndex] = this.listEntities.filter((entity: { entityName: string }) => entity.entityName.includes(value));
      if (this.filteredEntities[rowIndex].length == 0) {
        this.resetEntity(rowIndex);
      }
    } else {
      this.resetEntity(rowIndex);
    }
  }

  // Restablecer la información de la entidad
  resetEntity(rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    entry.entityId = 0;
    this.filteredEntities[rowIndex] = [];
  }

  // Comprobar si la lista de entidades filtradas está vacía
  isFilteredEntitiesEmpty(rowIndex: number): boolean {
    return this.filteredEntities[rowIndex] && this.filteredEntities[rowIndex].length == 0 && this.listaEntradas[rowIndex].entityId == 0;
  }

  // Ocultar el listado de entidades con un retraso
  delayedHideDropdownEntity(rowIndex: number) {
    setTimeout(() => {
      this.hideDropdownEntity(rowIndex);
    }, 200);
  }

  // Ocultar el listado de entidades
  hideDropdownEntity(rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    const filteredEntities: any[] = this.filteredEntities[rowIndex];
    if (filteredEntities.length == 1) {
      entry.entidad = filteredEntities[0].entityName;
      entry.entityId = filteredEntities[0].entityId;
    } else if (entry.entidad == '' && filteredEntities.length == 0) {
      entry.entityId = 0;
    } else if (filteredEntities.length > 1) {
      entry.entityId = 0;
    }
    this.filteredEntities[rowIndex] = [];
    console.log(this.listaEntradas[rowIndex]);
  }

  // Seleccionar una entidad
  selectedEntity(entity: any, rowIndex: number) {
    const entry = this.listaEntradas[rowIndex];
    entry.entidad = entity.entityName;
    entry.entityId = entity.entityId;
    this.filteredEntities[rowIndex] = [];
    const debeInput = this.getDebeInputInRow(rowIndex);
    if (debeInput) {
      debeInput.focus();
    }
  }
  getDebeInputInRow(rowIndex: number): HTMLInputElement | null {
    const currentRow = this.getRowElement(rowIndex);
    if (currentRow) {
      return currentRow.querySelector('input[name="debe"]') as HTMLInputElement;
    }
    return null;
  }

  //-------------------------------------------------------------------------------------------------------
  // Lógica para los inputs de debe y haber
  validarInput(event: any) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;
    const regex = /^[0-9.]*$/; // Expresión regular para validar que solo se ingresen números y puntos
    if (!regex.test(inputValue)) {
      inputValue = inputValue.replace(/[^0-9.]/g, '');
      inputElement.value = inputValue;
    }
    // Verificar si el primer dígito es 0 y eliminarlo si es necesario
    if (inputValue.startsWith('0') && inputValue.length > 1) {
      if(inputValue.charAt(1) != '.') {
        inputValue = inputValue.slice(1);
        inputElement.value = inputValue;
      }
    }
    // Verificar si hay más de un punto en el valor y, si es así, eliminar los extras
    const periods = inputValue.split('.').length - 1;
    if (periods > 1) {
      const parts = inputValue.split('.');
      inputValue = parts[0] + '.' + parts.slice(1).join('');
      inputElement.value = inputValue;
    }
    // Limitar a un máximo de 4 dígitos después del punto
    const parts = inputValue.split('.');
    if (parts.length > 1 && parts[1].length > 4) {
      inputValue = parts[0] + '.' + parts[1].slice(0, 4);
      inputElement.value = inputValue;
    }
    this.calcularTotales();
  }
  
  //-------------------------------------------------------------------------------------------------------
  // Lógica para calcular los totales
  totalDebe: number = 0;
  totalHaber: number = 0;
  diferencia: number = 0;

  calcularTotales() {
    const valoresDebe: number[] = this.listaEntradas.map((entrada: Entrada) => entrada.debe ? parseFloat(entrada.debe) : 0);
    this.totalDebe = valoresDebe.reduce((acc: number, debe: number) => acc + debe, 0);
    const valoresHaber: number[] = this.listaEntradas.map((entrada: Entrada) => entrada.haber ? parseFloat(entrada.haber) : 0);
    this.totalHaber = valoresHaber.reduce((acc: number, haber: number) => acc + haber, 0);
    this.diferencia = parseFloat((this.totalDebe - this.totalHaber).toFixed(4));
    console.log(this.listaEntradas);
  }

  //-------------------------------------------------------------------------------------------------------
  // Lógica para navegar entre los inputs
  navegarInputs(event: KeyboardEvent, rowIndex: number, columnName: string) {
    const currentInput = event.target as HTMLInputElement;
    let nextInput: HTMLInputElement | null = null;
    const currentRow = this.getRowElement(rowIndex); // Obtener la fila actual

    switch (event.key) {
      case 'ArrowUp':
        if (rowIndex > 0) {
          const previousRow = this.getRowElement(rowIndex - 1);
          if (previousRow) {
            nextInput = this.getInputInCell(previousRow, columnName);
          }
        }
        break;
      case 'ArrowDown':
        if (rowIndex < this.listaEntradas.length - 1) {
          const nextRow = this.getRowElement(rowIndex + 1);
          if (nextRow) {
            nextInput = this.getInputInCell(nextRow, columnName);
          }
        }
        break;
      case 'ArrowLeft':
        if (currentRow) {
          if (columnName === 'numeroCuenta') {
            const previousColumnName = 'fechaEmision';
            const previousRowIndex = rowIndex - 1;
            if (previousRowIndex >= 0) {
              const previousRow = this.getRowElement(previousRowIndex);
              if (previousRow) {
                nextInput = this.getInputInCell(previousRow, previousColumnName);
              }
            }
          } else if (columnName === 'auxiliar') {
            const previousColumnName = 'nombreCuenta';
            nextInput = this.getInputInCell(currentRow, previousColumnName);
          } else if (columnName === 'entidad') {
            const previousColumnName = 'auxiliar';
            nextInput = this.getInputInCell(currentRow, previousColumnName);
          } else {
            nextInput = this.getPreviousInput(currentInput);
          }
        }
        break;
      case 'ArrowRight':
        if (currentRow) {
          if (columnName === 'numeroCuenta') {
            const nextColumnName = 'nombreCuenta';
            nextInput = this.getInputInCell(currentRow, nextColumnName);
          } else if (columnName === 'auxiliar') {
            const nextColumnName = 'entidad';
            nextInput = this.getInputInCell(currentRow, nextColumnName);
          } else if (columnName === 'entidad') {
            const nextColumnName = 'debe';
            nextInput = this.getInputInCell(currentRow, nextColumnName);
          } else if (columnName === 'fechaEmision') {
            const nextRowIndex = rowIndex + 1;
            if (nextRowIndex < this.listaEntradas.length) {
              const nextRow = this.getRowElement(nextRowIndex);
              if (nextRow) {
                const nextColumnName = 'numeroCuenta';
                nextInput = this.getInputInCell(nextRow, nextColumnName);
              }
            }
          } else {
            nextInput = this.getNextInput(currentInput);
          }
        }
        break;
    }
    if (nextInput) {
      nextInput.focus();
      event.preventDefault();
    }
  }  

  getRowElement(rowIndex: number): HTMLElement | null {
    const table = document.querySelector('table');
    return table?.querySelector('tbody')?.children[rowIndex] as HTMLElement;
  }

  getInputInCell(rowElement: HTMLElement, columnName: string): HTMLInputElement | null {
    return rowElement?.querySelector(`td input[name="${columnName}"]`) as HTMLInputElement;
  }

  getPreviousInput(currentInput: HTMLInputElement): HTMLInputElement | null {
    return currentInput.parentElement?.previousElementSibling?.querySelector('input') as HTMLInputElement;
  }

  getNextInput(currentInput: HTMLInputElement): HTMLInputElement | null {
    return currentInput.parentElement?.nextElementSibling?.querySelector('input') as HTMLInputElement;
  }  

  /*guardar() {
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
  }*/

}

interface Entrada {
  cuentaId: number;
  numeroCuenta: string;
  nombreCuenta: string;
  cuentaValida: boolean;
  auxiliar: string;
  auxiliarAccountId: number;
  entidad: string;
  entityId: number;
  debe: string;
  haber: string;
  glosa: string;
  nroDoc: string;
  fechaEmision: string;
}