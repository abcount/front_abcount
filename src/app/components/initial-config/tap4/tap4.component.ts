import {Component, signal, ViewChild, ViewRef} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FormGroup} from "@angular/forms";
import {FormStateService} from "../../../services/form-state.service";
import { Router } from '@angular/router';


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
  classificator: boolean;
  level: number;
  childrenAccounts: Account[];
}

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.component.html',
  styleUrls: ['./tap4.component.css']
})



export class Tap4Component {

  mostrarPopup = false;
  mostrarPopupSon = false;
  mostrarPopupConfirm = false;

  // imagen sacada del localstorage


  @ViewChild("accountName") accountName: string = "";
  @ViewChild("digitsLevel") digitsLevel: string = "";
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

  constructor(public formService: FormStateService, private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: NodeExample) => node.expandable;

  //Method to add a new account

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
   }
   else{
     let strAccountName = node.name.split(" ", 1);
     let accountId = strAccountName[0];
     this.positioningLeaf(TREE_DATA, Number(accountId), node.level);
   }
   this.dataSource.data = TREE_DATA;
   this.accountName = "";
   this.digitsLevel = "";
   this.accountReport = false;
   this.accountMoneyRub = false;
   this.accountClassificator = false;
   this.mostrarPopup = false;
   this.mostrarPopupSon = false;
   // Hacer que se expandan los nodos :3
   let ten = node?.level;
   if (ten != null && ten >= 0) {
    const firstDigit = Math.floor(this.accountId / Math.pow(10, ten+1));
    this.expandNodesByFirstDigit(firstDigit);
   }
 }

  expandNodesByFirstDigit(firstDigit: number) {
    const nodesToExpand = this.treeControl.dataNodes.filter(
      (node) => node.name.startsWith(`${firstDigit}`)
    );
    nodesToExpand.forEach((node) => {
      this.treeControl.expand(node);
    });
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
    if (node==null){
      this.mostrarPopup = true;
    } else {
      this.mostrarPopupSon = true;
    }
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
    console.log(JSON.stringify(TREE_DATA, null, 2));
    console.log('*********************************************');

    const accountPlanArray = this.formService.fb.array(
      TREE_DATA.map(account =>
        this.formService.fb.group({
          ...account, // spread para agregar todas las propiedades de la cuenta
          childrenAccounts: this.formService.fb.array(account.childrenAccounts) // childrenAccounts como FormArray
        })
      )
    );

    this.formGroup.setControl('accountablePlan', accountPlanArray);
    this.printValue();
    this.enviarDatos();
    this.mostrarPopupConfirm = true;
  }



  printValue() {
   console.log('Datos en el formulario:');
    console.log(JSON.stringify(this.formGroup.value, null, 2));
  }

  enviarDatos() {
    const storedImagen = localStorage.getItem('imagen');
    const formData = new FormData();
    const image= this.formService.getImage();
    if (image) {
      // se obtuvo una imagen
      //imprimir la imagen
      console.log('Imagen en el componente:');
      console.log(image);
      formData.append('image', image);
    }


    formData.append('datos', JSON.stringify(this.formGroup.value));




    console.log('Datos en el formulario:');
    console.log(formData);
    console.log('Datos en el asklfmk;lsdklafnk;lsdnk;lno:');
    console.log(storedImagen);
    console.log('Datos en ojioapwjiopfjiaopj:');
    //mostrar en formato json
    console.log(JSON.stringify(this.formGroup.value, null, 2));
    this.formService.enviarDatos(formData).subscribe({
      next: response => {
        console.log('Respuesta del servidor:', response);
        this.formService.clearFormDataFromLocalStorage();
        if(response.success){
          localStorage.clear();
        }
      },
      error: error => {
        console.error('Error enviando datos:', error);
      }
    });
  }

  cancel(){
    this.mostrarPopup = false;
    this.mostrarPopupSon = false;
    this.accountName = "";
    this.digitsLevel = "";
    this.accountReport = false;
    this.accountMoneyRub = false;
    this.accountClassificator = false;
  }

  confirm(){
    this.router.navigate(['/my-companies']);
  }
}

