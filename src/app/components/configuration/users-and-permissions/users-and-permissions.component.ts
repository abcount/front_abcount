import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-and-permissions',
  templateUrl: './users-and-permissions.component.html',
  styleUrls: ['./users-and-permissions.component.css']
})
export class UsersAndPermissionsComponent {
  //Actualizar para el Json
  subsidiaries = [
    {
      subsidiaryId: 1,
      subsidiaryName: "Sucursal 1",
      address: "Av. 6 de Agosto",
      editable: false
    },
    {
      subsidiaryId: 2,
      subsidiaryName: "Sucursal 2",
      address: "Av. 6 de Agosto",
      editable: true
    }
  ];
  areas =[
    {
      areaId: 1,
      areaName: "Area 1",
      editable: false
    },
    {
      areaId: 2,
      areaName: "Area 2",
      editable: true
    },
    {
      areaId: 3,
      areaName: "Area 3",
      editable: false
    }
  ];

  user = {
    "userId": 5,
    "firstName": "Carlos",
    "lastName": "Zarate",
    "email": "carlos.zarate@ucb.edu.bo"
  }

  constructor(private router: Router) { }

  cancel(){
    this.router.navigate(['/configuration-tap/5']);
  }
}
