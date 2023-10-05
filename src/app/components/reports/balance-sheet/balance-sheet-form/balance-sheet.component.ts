import { Component } from '@angular/core';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent {

  subsidiaries = [
    {"subsidiaryId": 1,"subsidiaryName": "Sucursal 1","address": "Av. 6 de Agosto"},
    {"subsidiaryId": 2,"subsidiaryName": "Sucursal 2","address": "Av. 6 de Agosto"},
    {"subsidiaryId": 3,"subsidiaryName": "Sucursal 3","address": "Av. 6 de Agosto"},
    {"subsidiaryId": 4,"subsidiaryName": "Sucursal 4","address": "Av. 6 de Agosto"},
  ];

  areas = [
    {"areaId": 1,"areaName": "Area 1"},
    {"areaId": 2,"areaName": "Area 2"},
    {"areaId": 3,"areaName": "Area 3"},
    {"areaId": 4,"areaName": "Area 4"},
  ];

  transactionTypes = [
    {"transactionTypeId": 1,"transactionTypeName": "Ingreso"},
    {"transactionTypeId": 2,"transactionTypeName": "Egreso"},
    {"transactionTypeId": 3,"transactionTypeName": "Traspaso"},
  ];

  currencies = [
    {"currencyId": 1,"currencyName": "UFV"},
    {"currencyId": 2,"currencyName": "Dolares"},
    {"currencyId": 3,"currencyName": "Euros"},
  ];

}
