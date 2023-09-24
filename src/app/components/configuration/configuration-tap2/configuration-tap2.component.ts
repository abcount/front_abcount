import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

interface Elemento {
  nombre: string;
  children?: Elemento[];
  mostrarHijos?: boolean;
}

@Component({
  selector: 'app-configuration-tap2',
  templateUrl: './configuration-tap2.component.html',
  styleUrls: ['./configuration-tap2.component.css']
})
export class ConfigurationTap2Component {

  //Variables
  modoEdicion: boolean = false;
  
  //Listas de sucursales y areas
  sucursales: any[] = [
    {
      subsidiaryName: 'Sucursal centro',
      subsidiaryDirection: 'Centro La Paz'
    },
    {
      subsidiaryName: 'Sucursal sur',
      subsidiaryDirection: 'Sur La Paz'
    }
  ];
  areas: any[] = ['Ventas', 'Finanza', 'Contabilidad'];
  //Listas auxiliares
  auxSucursales = this.sucursales;
  auxAreas = this.areas;

  //Constructor
  constructor(private router: Router) { }

  @ViewChild('nombreSucursalInput') nombreSucursalInput: ElementRef;
  @ViewChild('direccionSucursalInput') direccionSucursalInput: ElementRef;
  @ViewChild('errorMessageSucursal') errorMessageSucursal: ElementRef;
  messageSucursal: string = 'La sucursal ya existe';
  //Lógica para agregar
  agregarSucursal() {
    console.log('Agregar sucursal');
    const nombresSucursales = this.sucursales.map(sucursal => sucursal.subsidiaryName);
    if (nombresSucursales.includes(this.nombreSucursalInput.nativeElement.value)) {
      this.errorMessageSucursal.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageSucursal.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.sucursales.push({
        subsidiaryName: this.nombreSucursalInput.nativeElement.value,
        subsidiaryDirection: this.direccionSucursalInput.nativeElement.value
      });
      this.limpiarCampos();
    }
    console.log(this.sucursales);
  }
  //Lógica para eliminar
  eliminarSucursal(sucursalName: string) {
    console.log('Eliminar sucursal');
    this.sucursales = this.sucursales.filter(sucursal => sucursal.subsidiaryName !== sucursalName);
    console.log(this.sucursales);
    if (this.sucursales.length == 0) {
      this.areas = [];
    }
  }

  @ViewChild('nombreAreaInput') nombreAreaInput: ElementRef;
  @ViewChild('errorMessageArea') errorMessageArea: ElementRef;
  messageArea: string = 'El área ya existe';
  //Logica para agregar area
  agregarArea() {
    console.log('Agregar área');
    if (this.areas.includes(this.nombreAreaInput.nativeElement.value)) {
      this.errorMessageArea.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageArea.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.areas.push(this.nombreAreaInput.nativeElement.value);
      this.nombreAreaInput.nativeElement.value = '';
    }
    console.log(this.areas);
  }
  //Logica para eliminar area
  eliminarArea(areaName: string) {
    console.log('Eliminar área');
    this.areas = this.areas.filter(area => area !== areaName);
    console.log(this.areas);
  }

  //Limpiar campos
  limpiarCampos() {
    this.nombreSucursalInput.nativeElement.value = '';
    this.direccionSucursalInput.nativeElement.value = '';
  }

  //Lógica para mostrar y ocultar hijos
  toggleChildren(elemento: Elemento): void {
    elemento.mostrarHijos = !elemento.mostrarHijos;
  }

  //Verificar si existe alguna sucursal y area
  guardar(){
    if (this.sucursales.length == 0) {
      this.messageSucursal = 'Debe agregar al menos una sucursal antes';
      this.errorMessageSucursal.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageSucursal.nativeElement.classList.remove('show');
      }, 2000);
    } else if (this.areas.length == 0) {
      this.messageArea = 'Debe agregar al menos un área antes';
      this.errorMessageArea.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageArea.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.auxSucursales = this.sucursales;
      this.auxAreas = this.areas;
      this.modoEdicion = false;
    }
  }

  //Cancelar la edición
  cancelar(){
    this.sucursales = this.auxSucursales;
    this.areas = this.auxAreas;
    this.modoEdicion = false;
  }

  //Editar
  editar() {
    this.modoEdicion = true;
  }
}