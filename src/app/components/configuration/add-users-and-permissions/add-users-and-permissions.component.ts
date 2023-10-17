import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-users-and-permissions',
  templateUrl: './add-users-and-permissions.component.html',
  styleUrls: ['./add-users-and-permissions.component.css']
})
export class AddUsersAndPermissionsComponent {

  constructor(private router: Router, private userService: UserService) { }

  // Controladores para los inputs
  NombreUsuario: string = '';
  areasSeleccionadas: number[] = [];
  sucursalesSeleccionadas: number[] = [];
  rolesSeleccionados: number[] = [];
  idsRolesSeleccionados: number[] = [];
  resultados: any[] = [];

  //Json para obtener las sucursales, areas y roles
  subsidiaries = [
    {
      subsidiaryId: 1,
      subsidiaryName: "Sucursal 1",
      address: "Av. 6 de Agosto",
      status: false
    },
    {
      subsidiaryId: 2,
      subsidiaryName: "Sucursal 2",
      address: "Av. 6 de Agosto",
      status: false
    }
  ];
  areas =[
    {
      areaId: 1,
      areaName: "Area 1",
      status: false
    },
    {
      areaId: 2,
      areaName: "Area 2",
      status: false
    },
    {
      areaId: 3,
      areaName: "Area 3",
      status: false
    }
  ];

  roles = [
    { id: 1, roleDescription: 'Agregar comprobantes', status: false },
    { id: 2, roleDescription: 'Editar comprobantes', status: false },
    { id: 3, roleDescription: 'Generar reportes', status: false },
    { id: 4, roleDescription: 'Agregar tasa de cambio', status: false }
  ];
  // Json para obtener los datos de los empleados
  data = [
    {
      id: 1,
      fullName: 'Juan Perez',
      userName: 'juanperez',
      email: 'juan@gmail.com',
      imagePath: 'assets/images/avatars/avatar-1.png',
    },
    {
      id: 2,
      fullName: 'Maria Lopez',
      userName: 'marialopez',
      email: 'maria@gmail.com',
      imagePath: 'assets/images/avatars/avatar-2.png',
    },
    {
      id: 3,
      fullName: 'Pedro Rodriguez',
      userName: 'pedrorodriguez',
      email: 'pedro@gmail.com',
      imagePath: 'assets/images/avatars/avatar-3.png',
    },
    {
      id: 4,
      fullName: 'Ana Gomez',
      userName: 'anagomez',
      email: 'ana@gmail.com',
      imagePath: 'assets/images/avatars/avatar-4.png',
    }
  ]

  buscarUsuario() {
    if (this.NombreUsuario) {
      console.log(this.NombreUsuario);
      this.userService.getUsersList(this.NombreUsuario).subscribe(
        (response: any) => {
          if (response.success) {
            console.log(response.data);
            this.resultados = response.data;
            // this.resultados = this.data.filter((usuario) =>
            //    usuario.userName.toLowerCase().includes(this.NombreUsuario.toLowerCase())
            // );

          } else {
            console.error(response.message);
          }
        },
        (error) => {
          console.error('Error al obtener lista de usuarios:', error);
        }
      );
      // this.resultados = this.data.filter((usuario) =>
      //   usuario.fullName.toLowerCase().includes(this.NombreUsuario.toLowerCase())
      // );
    } else {
      this.resultados = [];
    }
  }

  seleccionarUsuario(usuario: any) {
    this.NombreUsuario = usuario.userName;
    this.resultados = []; // Oculta la lista de sugerencias
  }

  // Logica para el marcado de checkbox
  syncCheckboxes(subsidiary: any, areas: any[]) {
    if (subsidiary.status) {
      areas.forEach((area) => (area.status = true));
    } else {
      areas.forEach((area) => (area.status = false));
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
      .filter((rol) => rol.status)
      .map((rol) => rol.id);
    console.log('IDs de roles seleccionados:', idsSeleccionados);
  }
  capturarIdsRolesSeleccionados() {
    this.idsRolesSeleccionados = this.roles
      .filter((rol) => rol.status)
      .map((rol) => rol.id);
  }
  // Función para agregar un usuario
  addedUser(){
    this.capturarIdsRolesSeleccionados();

    console.log("Usuario agregado",  this.NombreUsuario,"Areas agregado", 
    this.areasSeleccionadas,"Sucursales seleccionadas" ,this.sucursalesSeleccionadas, 
    "Roles seleccionados", this.idsRolesSeleccionados);
    this.userService.inviteUser(this.NombreUsuario, this.sucursalesSeleccionadas, this.areasSeleccionadas,  this.idsRolesSeleccionados).subscribe(
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
