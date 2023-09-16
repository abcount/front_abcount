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

interface Account {
  level: number;
  accountNumber: number;
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
     // @ts-ignore
     let newAccountId = accountId * 10 + 1;
     console.log(accountId);
     let childrenAccount = {
       level: node.level + 1,
       accountNumber: newAccountId,
       accountName: 'NEW CHILD',
       children: []
     }

     this.positioningLeaf(TREE_DATA, Number(accountId), node.level, childrenAccount);


   }
   this.dataSource.data = TREE_DATA;

 }

 // @ts-ignore
  positioningLeaf(listOfAccounts : Account[],  rootAccount : number, level: number, childrenAccount: Account ){
   if(listOfAccounts.length == 0){
     listOfAccounts.push(childrenAccount)
     return listOfAccounts;
   }
   console.log("aaa");
   console.log(rootAccount / Math.pow(10, level))
    console.log(Math.ceil(rootAccount / Math.pow(10, level)))
   this.positioningLeaf(listOfAccounts[rootAccount-1].children, Math.ceil(rootAccount / Math.pow(10, level)), level++, childrenAccount)


 }

}

