import { Component, ViewChild } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FormStateService } from "../../../services/form-state.service";

let TREE_DATA: Account[] = [];

interface NodeExample {
  expandable: boolean;
  name: string;
  level: number;
}

interface Account {
  codeAccount: number;
  nameAccount: string;
  moneyRub: boolean;
  report: boolean;
  editable: boolean;
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

  // Controladores para los popups
  mostrarPopup = false;
  mostrarPopupSon = false;

  @ViewChild("accountName") accountName: string = "";
  selectedNode: NodeExample | null = null;
  accountId: number = 0;
  accountMoneyRub: boolean = false;
  accountReport: boolean = false;
  accountClassificator: boolean = false;

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


  hasChild = (_: number, node: NodeExample) => node.expandable;


  // Variables
  accountPlan: any[] = []; // Plan de cuentas
  modeEdit: boolean = false; // Modo edición

  constructor(private ConfigurationService: ConfigurationService) {
    this.ConfigurationService.getAccountsPlan().subscribe(
      (data: any) => {
        this.dataSource.data = data.data;
        this.accountPlan = data.data;
      }
    );
    TREE_DATA = this.dataSource.data;
  }

  // Función al inicializar la pantalla
  ngOnInit() { }

  //METODO PARA DEFINIR LA CUENTA SELEECIONADA
  setSelectedNode(node: NodeExample | null){
    TREE_DATA = this.dataSource.data;
    console.log("TREE_DATA");
    console.log(TREE_DATA);
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
        codeAccount: TREE_DATA.length + 1,
        nameAccount: this.accountName,
        moneyRub: this.accountMoneyRub,
        report: this.accountReport,
        editable: true,
        classificator: this.accountClassificator,
        level: 0,
        childrenAccounts: []
      }
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
      if(listOfAccounts[j].codeAccount === selectedAccount){
        this.accountId = selectedAccount * 10 + listOfAccounts[j].childrenAccounts.length + 1;
        let newAccount: Account = {
          level: level + 1,
          codeAccount: selectedAccount * 10 + listOfAccounts[j].childrenAccounts.length + 1,
          nameAccount: this.accountName,
          moneyRub: this.accountMoneyRub,
          report: this.accountReport,
          editable: true,
          classificator: this.accountClassificator,
          childrenAccounts: []
        }
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
      if(listOfAccounts[j].codeAccount === selectedAccount){
        listOfAccounts.splice(j, 1);
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
    let parentAccount = Math.round(listOfAccounts[0].codeAccount / 10);
    for(let j = 0; j < listOfAccounts.length; j++){
      listOfAccounts[j].codeAccount = parentAccount * 10 + j + 1;
    }
  }

  // Función para activar el modo edición
  edit() {
    console.log('Activando modo edición...');
    console.log(this.dataSource.data);
    this.modeEdit = true;
  }

  // Función para desactivar el modo edición
  cancel() {
    this.ConfigurationService.getAccountsPlan().subscribe(
      (data: any) => {
        this.dataSource.data = data.data;
        this.accountPlan = data.data;
      }
    );
    TREE_DATA = this.dataSource.data;
    this.modeEdit = false;
  }

  // Función para guardar los cambios
  save() {
    console.log('Guardando cambios...');
    this.modeEdit = false;
  }

  // Función para ocultar los popups
  cancelPopup(){
    this.mostrarPopup = false;
    this.mostrarPopupSon = false;
  }
}
