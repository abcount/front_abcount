import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-and-permissions',
  templateUrl: './users-and-permissions.component.html',
  styleUrls: ['./users-and-permissions.component.css']
})
export class UsersAndPermissionsComponent {

  // Controladores para los inputs
  areasSeleccionadas: number[] = [];
  sucursalesSeleccionadas: number[] = [];
  rolesSeleccionados: number[] = [];
  idsRolesSeleccionados: number[] = [];

  //Actualizar para el Json
  subsidiaries = [
    {
      subsidiaryId: 1,
      subsidiaryName: "Sucursal 1",
      address: "Av. 6 de Agosto",
      selected: true
    },
    {
      subsidiaryId: 2,
      subsidiaryName: "Sucursal 2",
      address: "Av. 6 de Agosto",
      selected: false
    }
  ];
  areas =[
    {
      areaId: 1,
      areaName: "Area 1",
      selected: true
    },
    {
      areaId: 2,
      areaName: "Area 2",
      selected: true
    },
    {
      areaId: 3,
      areaName: "Area 3",
      selected: false
    }
  ];

  roles = [
    { id: 1, nombre: 'Agregar comprobantes', seleccionado: false },
    { id: 2, nombre: 'Editar comprobantes', seleccionado: true },
    { id: 3, nombre: 'Generar reportes', seleccionado: true },
    { id: 4, nombre: 'Agregar tasa de cambio', seleccionado: false }
  ];

  user = {
    "userId": 5,
    "firstName": "Sebastian",
    "lastName": "Belmonte",
    "email": "sebastian.belmonte@ucb.edu.bo"
  }

  constructor(private router: Router, private userService: UserService) { }

  // Logica para el marcado de checkbox
  syncCheckboxes(subsidiary: any, areas: any[]) {
    if (subsidiary.selected) {
      areas.forEach((area) => (area.selected = true));
    } else {
      areas.forEach((area) => (area.selected = false));
    }
  }
  // Guarda listado de id de areas seleccionadas en un array
  onAreaChange(areaId: number) {
    if (this.areasSeleccionadas.includes(areaId)) {
      this.areasSeleccionadas = this.areasSeleccionadas.filter((id) => id !== areaId);
    } else {
      this.areasSeleccionadas.push(areaId);
    }
  }
  // Guarda listado de id de sucursales seleccionadas en un array
  onSubsidiaryChange(subsidiaryId: number) {
    if (this.sucursalesSeleccionadas.includes(subsidiaryId)) {
      this.sucursalesSeleccionadas = this.sucursalesSeleccionadas.filter((id) => id !== subsidiaryId);
    } else {
      this.sucursalesSeleccionadas.push(subsidiaryId);
    }
  }
  // Guarda listado de id de roles seleccionadas en un array
  obtenerIdsRolesSeleccionados() {
    const idsSeleccionados = this.roles
      .filter((rol) => rol.seleccionado)
      .map((rol) => rol.id);
    console.log('IDs de roles seleccionados:', idsSeleccionados);
  }
  capturarIdsRolesSeleccionados() {
    this.idsRolesSeleccionados = this.roles
      .filter((rol) => rol.seleccionado)
      .map((rol) => rol.id);
  }

  // Función para agregar un usuario
  Update(){
    this.capturarIdsRolesSeleccionados();

    console.log("Usuario agregado",  this.user.userId,"Areas agregado", 
    this.areasSeleccionadas,"Sucursales seleccionadas" ,this.sucursalesSeleccionadas, 
    "Roles seleccionados", this.idsRolesSeleccionados);
    this.userService.updatePermissions(this.user.userId, this.sucursalesSeleccionadas, this.areasSeleccionadas,  this.idsRolesSeleccionados).subscribe(
      (response: any) => {
        if (response.success) {
          console.log(response.message);
          //this.router.navigate(['/configuration-tap/5']);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error('Error al agregar moneda:', error);
      }
    );
  }

  cancel(){
    this.router.navigate(['/configuration-tap/5']);
  }
}
