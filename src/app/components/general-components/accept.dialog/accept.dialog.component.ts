import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accept.dialog',
  templateUrl: './accept.dialog.component.html',
  styleUrls: ['./accept.dialog.component.css']
})
export class AcceptDialogComponent {

  public fName!: string;
  public fIndex: any;

  constructor(private modalRef: MatDialogRef<AcceptDialogComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: {title: string, message: string, route: string }, private router:Router) { }

  confirm() {
    this.modalRef.close();
    this.router.navigate([this.data.route]);
  }
  cancel() {
    this.modalRef.close();
  }
}
