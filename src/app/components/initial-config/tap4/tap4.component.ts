import {Component, signal, ViewChild, ViewRef} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";


const TREE_DATA: Account[] = [

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
  clasificator: boolean;
  level: number;
  children: Account[];
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
      expandable: !!node.children && node.children.length > 0,
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
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: NodeExample) => node.expandable;

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
       children: []
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

  // @ts-ignore
  positioningLeaf(listOfAccounts : Account[], selectedAccount: number, level: number){
     for(let j = 0; j < listOfAccounts.length; j++){
       if(listOfAccounts[j].accountCode === selectedAccount){
         this.accountId = selectedAccount * 10 + listOfAccounts[j].children.length + 1;
         let newAccount : Account = {
           level: level + 1,
           accountCode: selectedAccount * 10 + listOfAccounts[j].children.length + 1,
           nameAccount: this.accountName,
           moneyRub: this.accountMoneyRub,
           report: this.accountReport,
           clasificator: this.accountClasificator,
           children: []
         }
         console.log(newAccount);
         listOfAccounts[j].children.push(newAccount);
         this.accountName = "";
         return listOfAccounts;
       }
       else{
          this.positioningLeaf(listOfAccounts[j].children, selectedAccount, level);
       }
     }
  }


  setSelectedNode(node: NodeExample | null){
    this.selectedNode = node;
  }

  printTree(){
    console.log(TREE_DATA);
  }



}

