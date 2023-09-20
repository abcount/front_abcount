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

  iconInputNombre = "fa-solid fa-shop";
  iconInputArea = "fa-regular fa-building";
  labelNombre = 'Nombre de la sucursal';
  labelDireccion = 'Dirección';
  labelNombreArea = 'Nombre del area';
  placeholderDireccion = 'Ingrese la dirección de la sucursal';
  iconInputDireccion = "fa-regular fa-map-marker-alt";
  buttonText: string = 'AGREGAR';
  placeholderSubsidiary: string = 'Ingrese el nombre de tu sucursal';

  placeholderAddress: string = 'Ingrese la dirección de tu sucursal';
  placeholderArea: string = 'Ingrese el nombre de tu área';
  
  // Una de las siguientes estructuras para guardar los datos

  sucursal: { nombre: string, area: [{nombre: string}] }[] = [];
  empresa:{nombre: string, sucursal: [{nombre: string, area: [{nombre: string}]}]}[] = [];

  arbol: Elemento[] = [
    {
      nombre: 'Empresa textilon',
      children: [
        {
          nombre: 'Sucursal centro',
          children: [
            {
              nombre: 'Ventas',
              children: []
            },
            {
              nombre: 'Finanzas',
              children: []
            },
            {
              nombre: 'Control',
              children: []
            }
          ]
        },
        {
          nombre: 'Sucursal sur',
          children: [
            {
              nombre: 'Ventas',
              children: []
            }
          ]
        }
      ]
    }
  ];
  // la logica para agregar
  agregarSucursal() {
    console.log("agregar sucursal");
    this.arbol.push({
      nombre: this.placeholderSubsidiary,
      children: [
        {
          nombre: 'Ventas',
          children: []
        },
        {
          nombre: 'Finanzas',
          children: []
        },
      ]

      
    });
    console.log(this.arbol); 
  }
  // la logica para eliminar
  eliminarSucursal() {
    console.log("eliminar sucursal");
    this.arbol.pop();
    console.log(this.arbol);
  }
  toggleChildren(elemento: Elemento): void {
    elemento.mostrarHijos = !elemento.mostrarHijos;
  }


  onClick() {
    console.log('Button clicked!');
  }

  onInputText(text: string) {
    console.log('Text changed: ' + text);
  }

  constructor(private formStateService: FormStateService) {
    
  }
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
