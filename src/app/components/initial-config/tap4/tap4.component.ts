import { Component } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";


interface Account {
  accountNumber: string;
  accountName: string;
  children: Account[];

}

const TREE_DATA: Account[] = [
  {
    accountNumber: '1',
    accountName: 'Main Account',
    children: [
      {
        accountNumber: '11',
        accountName: 'Sub Account',
        children: [
          {
            accountNumber: '111',
            accountName: 'Sub Sub Account',
            children: []
          }
        ]
      },
      {
        accountNumber: '12',
        accountName: 'Sub Account',
        children: [
          {
            accountNumber: '121',
            accountName: 'Sub Sub Account',
            children: []
          }
        ]
      },

    ]
  },
  {
    accountNumber: '2',
    accountName: 'Second Account',
    children: [
      {
        accountNumber: '21',
        accountName: 'Sub Account',
        children: [
          {
            accountNumber: '222',
            accountName: 'Sub Sub Account',
            children: []
          }
        ]
      },

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
  buttonText: string = 'Click me!';

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


  onClick() {
    console.log('Button clicked!');
  }
  onTextChanged(text: string) {
    console.log('Text changed: ' + text);
  }
}

