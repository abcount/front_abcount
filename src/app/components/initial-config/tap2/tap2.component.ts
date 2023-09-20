import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormStateService } from 'src/app/services/form-state.service';

interface Elemento {
  nombre: string;
  children?: Elemento[];
  mostrarHijos?: boolean;
}

@Component({
  selector: 'app-tap2',
  templateUrl: './tap2.component.html',
  styleUrls: ['./tap2.component.css']
})
export class Tap2Component {

  /*Input nombre se sucursal*/
  iconInputNombre = "fa-solid fa-shop";
  labelNombre = 'Nombre de la sucursal';
  placeholderSubsidiary: string = 'Ingrese el nombre de tu sucursal';
  /*Input dirección sucursal*/
  iconInputDireccion = "fa-regular fa-map-marker-alt";
  labelDireccion = 'Dirección de la sucursal';
  placeholderAddress: string = 'Ingrese la dirección de tu sucursal';
  /*Input area*/
  iconInputArea = "fa-regular fa-building";
  labelNombreArea = 'Nombre del area';
  placeholderArea: string = 'Ingrese el nombre de tu área';

  /*Patrones generales*/
  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';

  /*Controladores*/
  controlSubsidiaryName = new FormControl();
  controlSubsidiaryAddress = new FormControl();
  controlAreaName = new FormControl();

  //Constructor
  constructor(private formStateService: FormStateService) { }
  
  // Una de las siguientes estructuras para guardar los datos
  sucursal: { nombre: string, area: [{nombre: string}] }[] = [];
  empresa:{nombre: string, sucursal: [{nombre: string, area: [{nombre: string}]}]}[] = [];

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
  
  //Lógica para agregar
  agregarSucursal() {
    console.log("Agregar sucursal");
    this.sucursales.push({
      subsidiaryName: this.controlSubsidiaryName.value,
      subsidiaryDirection: this.controlSubsidiaryAddress.value
    });
    console.log(this.sucursales);
    this.limpiarCampos();
  }
  //Lógica para eliminar
  eliminarSucursal(sucursalName: string) {
    console.log("Eliminar sucursal");
    this.sucursales = this.sucursales.filter((sucursal) => sucursal.subsidiaryName !== sucursalName);
    console.log(this.sucursales);
  }

  //Logica para agregar area
  agregarArea() {
    console.log('Agregar área');
    this.areas.push(this.controlAreaName.value);
    console.log(this.areas);
    this.limpiarCampos();
  }
  //Logica para eliminar area
  eliminarArea(areaName: string) {
    console.log('Eliminar área');
    this.areas = this.areas.filter((area) => area !== areaName);
    console.log(this.areas);
  }

  //Limpiar campos
  limpiarCampos() {
    this.controlSubsidiaryName.reset();
    this.controlSubsidiaryAddress.reset();
    this.controlAreaName.reset();
  }

  //Lógica para mostrar y ocultar hijos
  toggleChildren(elemento: Elemento): void {
    elemento.mostrarHijos = !elemento.mostrarHijos;
  }

  //Imprimiendo datos
  printValue() {
    console.log(JSON.stringify(this.formStateService.getForm().value, null, 2));
  }
  get formGroup(): FormGroup {
    return this.formStateService.form;
  }
  get subsidiaryControl(): FormControl {
    return this.formGroup.get('subsidiary') as FormControl;
  }
}