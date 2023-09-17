import {Component, signal} from '@angular/core';
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
  accountNumber: number;
  level: number;
  accountName: string;
  children: Account[];
}

@Component({
  selector: 'app-tap4',
  templateUrl: './tap4.component.html',
  styleUrls: ['./tap4.component.css']
})



export class Tap4Component {

  private _transformer = (node: Account, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.accountNumber + ' ' + node.accountName,
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
     let parentAccount = {
       level: 0,
       accountNumber: TREE_DATA.length + 1,
       accountName: 'NEW',
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
   console.log("TREE DATA")
    console.log(TREE_DATA);


 }

  // @ts-ignore
  positioningLeaf(listOfAccounts : Account[], selectedAccount: number, level: number){
    console.log(selectedAccount);
     for(let j = 0; j < listOfAccounts.length; j++){
       if(listOfAccounts[j].accountNumber === selectedAccount){
         let newAccount : Account = {
           level: level + 1,
           accountNumber: selectedAccount * 10 + listOfAccounts[j].children.length + 1,
           accountName: "SEBAS in level " + level + " with parent " + selectedAccount + " and account id " + selectedAccount + " and length " + listOfAccounts.length,
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

