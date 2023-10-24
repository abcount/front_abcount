import { Component } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {ConfigurationService} from "../../../../services/configuration.service";

@Component({
  selector: 'app-general-ledger-form',
  templateUrl: './general-ledger-form.component.html',
  styleUrls: ['./general-ledger-form.component.css']
})

export class GeneralLedgerFormComponent {

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


  hasChild = (_: number, node: NodeExample) => node.expandable;


  // Variables
  accountPlan: any[] = []; // Plan de cuentas
  TREE_DATA: Account[] = [];
  private _transformer = (node: Account, level: number) => {
    return {
      expandable: !!node.childrenAccounts && node.childrenAccounts.length > 0,
      name: node.codeAccount + ' ' + node.nameAccount,
      level: level,
    };
  };



  treeControl = new FlatTreeControl<NodeExample>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.childrenAccounts,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor(private ConfigurationService: ConfigurationService) {
    this.ConfigurationService.getAccountsPlan().subscribe(
      (data: any) => {
        console.log("ACCOUNT PLAN")
        console.log(data)
        this.dataSource.data = data.data;
        this.accountPlan = data.data;
      }
    );
    TREE_DATA = this.dataSource.data;
  }

}


interface NodeExample {
  expandable: boolean;
  name: string;
  level: number;
}


interface Account {
  accountId: number | null;
  codeAccount: number;
  nameAccount: string;
  moneyRub: boolean;
  report: boolean;
  classificator: boolean;
  level: number;
  childrenAccounts: Account[];
  editable: boolean;
}
let TREE_DATA: Account[] = [];
