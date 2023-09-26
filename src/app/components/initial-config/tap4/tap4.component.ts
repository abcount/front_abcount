import {Component, signal, ViewChild, ViewRef} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FormGroup} from "@angular/forms";
import {FormStateService} from "../../../services/form-state.service";


const TREE_DATA: Account[] = [

];

const NEW_TREE_DATA: Account[] = [];

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
  clasificator: boolean;
  level: number;
  childrenAccounts: Account[];
}

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.component.html',
  styleUrls: ['./tap4.component.css']
})



export class Tap4Component {

  @ViewChild("accountName") accountName: string = "";
  selectedNode: NodeExample | null = null;
  accountId: number = 0;
  accountMoneyRub: boolean = false;
  accountReport: boolean = false;
  accountClasificator: boolean = false;

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

  constructor(public formService: FormStateService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: NodeExample) => node.expandable;

  //Method to add a new account

 addNewChildAccount(node : NodeExample | null ) {
   if(node == null){
     this.accountId = TREE_DATA.length + 1;
     let parentAccount = {
       level: 0,
       accountCode: TREE_DATA.length + 1,
       nameAccount: this.accountName,
       moneyRub: this.accountMoneyRub,
       report: this.accountReport,
       clasificator: this.accountClasificator,
       childrenAccounts: []
     }
     console.log(parentAccount);

     TREE_DATA.push(parentAccount);
     this.accountName = "";
     this.accountReport = false;
     this.accountMoneyRub = false;
     this.accountClasificator = false;

   }
   else{
     let strAccountName = node.name.split(" ", 1);
     let accountId = strAccountName[0];
     this.positioningLeaf(TREE_DATA, Number(accountId), node.level);
   }
   this.dataSource.data = TREE_DATA;
 }

 //Method to add a new account leaf its a DFS algorithm

  // @ts-ignore
  positioningLeaf(listOfAccounts : Account[], selectedAccount: number, level: number){
    for(let j = 0; j < listOfAccounts.length; j++){
      if(listOfAccounts[j].accountCode === selectedAccount){
        this.accountId = selectedAccount * 10 + listOfAccounts[j].childrenAccounts.length + 1;
        let newAccount : Account = {
          level: level + 1,
          accountCode: selectedAccount * 10 + listOfAccounts[j].childrenAccounts.length + 1,
          nameAccount: this.accountName,
          moneyRub: this.accountMoneyRub,
          report: this.accountReport,
          clasificator: this.accountClasificator,
          childrenAccounts: []
        }
        console.log(newAccount);
        listOfAccounts[j].childrenAccounts.push(newAccount);
        this.accountName = "";
        return listOfAccounts;
      }
      else{
        this.positioningLeaf(listOfAccounts[j].childrenAccounts, selectedAccount, level);
      }
    }
  }


//Method to delete an account


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

  setSelectedNode(node: NodeExample | null){
    this.selectedNode = node;
  }

  printTree(){
    console.log(TREE_DATA);
  }

//   FORM GROUP

  get formGroup(): FormGroup {
    return this.formService.formGroup;
  }


  guardarJSON() {
    console.log('Datos en JSON:');
    console.log(TREE_DATA);
    const accountPlanArray = this.formService.fb?.array(
      TREE_DATA.map(account => this.formService.fb?.group(account))
    );
    // Añadir jsonData al formGroup
    const configCurrencyGroup = this.formGroup?.get('enterprise.configAccount') as FormGroup;
    configCurrencyGroup.setControl('accountPlan', accountPlanArray);
    this.printValue()

    // configCurrencyGroup.get()?.setValue(TREE_DATA);
  }

  printValue() {
   console.log('Datos en el formulario:');
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }
  
  enviarDatos() {
    this.formService.enviarDatos(this.formGroup.value).subscribe(response => {
      console.log('Respuesta del servidor:', response);
    }, error => {
      console.error('Error enviando datos:', error);
    });
  }






}

