import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users-and-permissions',
  templateUrl: './add-users-and-permissions.component.html',
  styleUrls: ['./add-users-and-permissions.component.css']
})
export class AddUsersAndPermissionsComponent {

  constructor(private router: Router) { }
  
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

  cancel(){
    this.router.navigate(['/configuration-tap/5']);
  }
}
