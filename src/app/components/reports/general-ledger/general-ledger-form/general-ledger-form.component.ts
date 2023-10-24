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
  subsidiaries: any[] = [];
  areas: any[] = [];
  currencies: any[] = [];


  ngOnInit() {
    // Obtener las sucursales y areas
    this.configurationService.getSubsidiaries().subscribe(
      (data: any) => {
        console.log(data);
        this.subsidiaries = data.data.subsidiaries;
        this.areas = data.data.areas;
      }
    );
    this.configurationService.getCurrencies().subscribe((data: any) => {
      console.log(data);
      this.currencies = data.data.currencyConfig;
    });
  }

  transactionTypes = [
    {"transactionTypeId": 1,"transactionTypeName": "Ingreso"},
    {"transactionTypeId": 2,"transactionTypeName": "Egreso"},
    {"transactionTypeId": 3,"transactionTypeName": "Traspaso"},
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
  constructor(private configurationService: ConfigurationService) {
    this.configurationService.getAccountsPlan().subscribe(
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
