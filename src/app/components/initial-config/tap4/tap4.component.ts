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


/*
*  0 1 2 3
*  1
*  2
*  3
*
* */


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
  accountReport = false;
  accountMoneyRub = false;
  accountClasificator = false;
  accountId = 0;
  @ViewChild("accountName") accountName: string = "";
  modalCalled = false;

  selectedNode: NodeExample | null = null;


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
     TREE_DATA.push(parentAccount);
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
         listOfAccounts[j].children.push(newAccount);
         return listOfAccounts;
       }
       else{
          this.positioningLeaf(listOfAccounts[j].children, selectedAccount, level);
       }
     }

  }

  // @ts-ignore
  setName(listOfAccounts : Account[], selectedAccount: number, accountName: string){
    for(let j = 0; j < listOfAccounts.length; j++){
      if(listOfAccounts[j].accountCode === selectedAccount){
        console.log(listOfAccounts[j]);

        listOfAccounts[j].nameAccount = accountName;

        console.log(listOfAccounts[j]);
        return listOfAccounts[j];
      }
      else{
        this.setName(listOfAccounts[j].children, selectedAccount, accountName);
      }
    }
  }

  setAccount(selectedAccount: number){
    this.setName(TREE_DATA, selectedAccount, this.accountName);
  }


 /*
 // @ts-ignore
  positioningLeaf(listOfAccounts : Account[],  accountId : number, level: number,  parentAccount: number){
   if(listOfAccounts.length === 0 || parentAccount == accountId){ //Need to put a condition to create brother accounts
     console.log(parentAccount === accountId);
     let newAccount : Account = {
       level: level,
       accountNumber: accountId * 10 + listOfAccounts.length + 1,
       accountName: "SEBAS in level " + level + " with parent " + parentAccount + " and account id " + accountId + " and length " + listOfAccounts.length,
       children: []
     }
     listOfAccounts.push(newAccount);
     console.log("NEW LIST OF ACCOUNTS")
      console.log(listOfAccounts);
     return listOfAccounts;
   }
   console.log("NewRootAccount");
   console.log((accountId % 10) - 1);
   this.positioningLeaf(listOfAccounts[(accountId % 10) - 1].children, accountId, level, parentAccount);
  }
  */

}

