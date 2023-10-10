import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-users-and-permissions',
  templateUrl: './add-users-and-permissions.component.html',
  styleUrls: ['./add-users-and-permissions.component.css']
})
export class AddUsersAndPermissionsComponent {

  constructor(private router: Router) { }
  selectAll = false;
  

  // Controladores para los inputs
  NombreUsuario: string = '';
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
      selected: false
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
      selected: false
    },
    {
      areaId: 2,
      areaName: "Area 2",
      selected: false
    },
    {
      areaId: 3,
      areaName: "Area 3",
      selected: false
    }
  ];

  roles = [
    { id: 1, nombre: 'Agregar comprobantes', seleccionado: false },
    { id: 2, nombre: 'Editar comprobantes', seleccionado: false },
    { id: 3, nombre: 'Generar reportes', seleccionado: false },
    { id: 4, nombre: 'Agregar tasa de cambio', seleccionado: false }
  ];
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
  addedUser(){
    this.capturarIdsRolesSeleccionados();

    console.log("Usuario agregado",  this.NombreUsuario,"Areas agregado", 
    this.areasSeleccionadas,"Sucursales seleccionadas" ,this.sucursalesSeleccionadas, 
    "Roles seleccionados", this.idsRolesSeleccionados);
  }

  cancel(){
    this.router.navigate(['/configuration-tap/5']);
  }
}
