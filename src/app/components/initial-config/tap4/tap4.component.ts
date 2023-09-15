import { Component } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";


interface Account {
  level: number;
  accountNumber: string;
  accountName: string;
  children: Account[];

}

const newAccount: Account = {
  level: 0,
  accountNumber: '00000',
  accountName: 'NUEVOOO',
  children: []
}

const TREE_DATA: Account[] = [
  {
    level: 0,
    accountNumber: '00000',
    accountName: 'Prueba',
    children: [
    ]

  }
];

interface NodeExample {
  expandable: boolean;
  name: string;
  level: number;
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


 addNewChildAccount(level: number) {
   console.log('addNewChildAccount');
   TREE_DATA[0].children.push(newAccount)
    this.dataSource.data = TREE_DATA;

 }



}

