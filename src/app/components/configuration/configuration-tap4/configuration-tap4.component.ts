import {Component, ViewChild} from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FormStateService} from "../../../services/form-state.service";

const TREE_DATA: Account[] = [
  {
    accountCode: 1,
    nameAccount: 'Activo',
    moneyRub: true,
    report: false,
    classificator: false,
    level: 0,
    childrenAccounts: []
  },
  {
    accountCode: 2,
    nameAccount: 'Pasivo',
    moneyRub: true,
    report: false,
    classificator: false,
    level: 0,
    childrenAccounts: []
  },
  {
    accountCode: 3,
    nameAccount: 'Patrimoinio',
    moneyRub: true,
    report: false,
    classificator: false,
    level: 0,
    childrenAccounts: []
  },
  {
    accountCode: 4,
    nameAccount: 'Ingresos',
    moneyRub: true,
    report: false,
    classificator: false,
    level: 0,
    childrenAccounts: []
  },
  {
    accountCode: 5,
    nameAccount: 'Egresos',
    moneyRub: true,
    report: false,
    classificator: false,
    level: 0,
    childrenAccounts: []
  }
];

interface NodeExample {
  expandable: boolean;
  name: string;
  level: number;
}

interface Account {
  accountCode: number;
  nameAccount: string;
  moneyRub: boolean;
  report: boolean;
  classificator: boolean;
  level: number;
  childrenAccounts: Account[];
}

@Component({
  selector: 'app-configuration-tap4',
  templateUrl: './configuration-tap4.component.html',
  styleUrls: ['./configuration-tap4.component.css']
})
export class ConfigurationTap4Component {



  mostrarPopup = false;
  mostrarPopupSon = false;

  // imagen sacada del localstorage


  @ViewChild("accountName") accountName: string = "";
  selectedNode: NodeExample | null = null;
  accountId: number = 0;
  accountMoneyRub: boolean = false;
  accountReport: boolean = false;
  accountClassificator: boolean = false;


  private _transformer = (node: Account, level: number) => {
    return {
      expandable: !!node.childrenAccounts && node.childrenAccounts.length > 0,
      name: node.accountCode + ' ' + node.nameAccount,
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


  hasChild = (_: number, node: NodeExample) => node.expandable;


  // Variables
  accountPlan: any[] = []; // Plan de cuentas
  modeEdit: boolean = false; // Modo edición

  constructor(private ConfigurationService: ConfigurationService) {
    this.dataSource.data = TREE_DATA;
  }



  // Función al inicializar la pantalla
  ngOnInit() {
    // this.ConfigurationService.getAccountsPlan().subscribe(
    //   (data: any) => {
    //     this.accountPlan = data.data;
    //   }
    // );
  }

  //METODO PARA DEFINIR LA CUENTA SELEECIONADA
  setSelectedNode(node: NodeExample | null){
    this.selectedNode = node;
    if (node==null){
      this.mostrarPopup = true;
    } else {
      this.mostrarPopupSon = true;
    }
  }



  //LOGICA PARA ANADIR UNA NUEVA CUENTA AL PLAN DE CUENTA
  addNewChildAccount(node : NodeExample | null ) {
    if(node == null){
      this.accountId = TREE_DATA.length + 1;
      let parentAccount = {
        accountCode: TREE_DATA.length + 1,
        nameAccount: this.accountName,
        moneyRub: this.accountMoneyRub,
        report: this.accountReport,
        classificator: this.accountClassificator,
        level: 0,
        childrenAccounts: []
      }
      console.log(parentAccount);

      TREE_DATA.push(parentAccount);
      this.accountName = "";
      this.accountReport = false;
      this.accountMoneyRub = false;
      this.accountClassificator = false;
      this.mostrarPopup = false;
    }
    else{
      let strAccountName = node.name.split(" ", 1);
      let accountId = strAccountName[0];
      this.positioningLeaf(TREE_DATA, Number(accountId), node.level);
      this.mostrarPopupSon = false;
    }
    this.dataSource.data = TREE_DATA;
  }
  //Method to add a new account leaf its a DFS algorithm

  // @ts-ignore
  positioningLeaf(listOfAccounts: Account[], selectedAccount: number, level: number){
    for(let j = 0; j < listOfAccounts.length; j++){
      if(listOfAccounts[j].accountCode === selectedAccount){
        this.accountId = selectedAccount * 10 + listOfAccounts[j].childrenAccounts.length + 1;
        let newAccount: Account = {
          level: level + 1,
          accountCode: selectedAccount * 10 + listOfAccounts[j].childrenAccounts.length + 1,
          nameAccount: this.accountName,
          moneyRub: this.accountMoneyRub,
          report: this.accountReport,
          classificator: this.accountClassificator,
          childrenAccounts: []
        }
        console.log(newAccount);

        // Asegurarse de que childrenAccounts es un array
        if (!Array.isArray(listOfAccounts[j].childrenAccounts)) {
          listOfAccounts[j].childrenAccounts = [];
        }

        listOfAccounts[j].childrenAccounts.push(newAccount);
        this.accountName = "";
        return listOfAccounts;
      } else {
        this.positioningLeaf(listOfAccounts[j].childrenAccounts, selectedAccount, level);
      }
    }
  }


  //FUNCION PARA ELEMINIAR Y VOLVER A ENUMERAR EL PLAN DE CUENTAS MODIFICADO

  deleteAccount(node : NodeExample | null){
    if(node == null){
      alert("Select an account to delete");
    }
    else{
      let strAccountName = node.name.split(" ", 1);
      let accountId = strAccountName[0];
      this.deleteLeaf(TREE_DATA, Number(accountId));
    }
    this.dataSource.data = TREE_DATA;
  }

  // @ts-ignore
  deleteLeaf(listOfAccounts : Account[], selectedAccount: number){
    for(let j = 0; j < listOfAccounts.length; j++){
      if(listOfAccounts[j].accountCode === selectedAccount){
        listOfAccounts.splice(j, 1);
        console.log(listOfAccounts);
        if(listOfAccounts.length !== 0){
          this.enumerateAccounts(listOfAccounts);
        }
        return listOfAccounts;
      }
      else{
        this.deleteLeaf(listOfAccounts[j].childrenAccounts, selectedAccount);
      }
    }
  }

  enumerateAccounts(listOfAccounts : Account[]){
    let parentAccount = Math.round(listOfAccounts[0].accountCode / 10);
    console.log("PADRE: " + parentAccount);
    console.log(listOfAccounts)
    for(let j = 0; j < listOfAccounts.length; j++){
      console.log("HIJO: " + (parentAccount * 10 + j + 1));
      listOfAccounts[j].accountCode = parentAccount * 10 + j + 1;
    }
    console.log("LISTA DE CUENTAS");
    console.log(listOfAccounts);

  }



  // Función para activar el modo edición
  edit() {
    this.modeEdit = true;
  }

  // Función para desactivar el modo edición
  cancel() {
    this.modeEdit = false;
  }

  // Función para guardar los cambios
  save() {
    console.log('Guardando cambios...');
    this.modeEdit = false;
  }
}
