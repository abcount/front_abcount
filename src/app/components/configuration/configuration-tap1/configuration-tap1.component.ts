import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-configuration-tap1',
  templateUrl: './configuration-tap1.component.html',
  styleUrls: ['./configuration-tap1.component.css']
})
export class ConfigurationTap1Component {

  placeholderNombre: string  = 'Ingrese el nombre de tu sucursal';
  placeholderDireccion: string = 'Ingrese la dirección de tu sucursal';
  placeholderRubro: string = 'Ingrese el rubro de tu sucursal';
  placeholderNIT: string = 'Ingrese el NIT de tu sucursal';
  placeholderEmail: string = 'Ingrese el email de tu sucursal';
  placeholderNumeroContacto: string = 'Ingrese el número de contacto de tu sucursal';

  empresa = {
    nombre: 'Empresa textil',
    direccion: 'Av. 6 de Agosto',	
    rubro: 'Textil',
    nit: '123456789',
    email: 'emp.textil@gmail.com',
    numeroContacto: '12345678',
    logo: '../../../../assets/imagen.svg',
  }

  @ViewChild('nombreInput') nombreInput: any;
  @ViewChild('rubroInput') rubroInput: any;
  @ViewChild('nitInput') nitInput: any;
  srcLogo: string = '../../../../assets/imagen.svg';
  @ViewChild('direccionInput') direccionInput: any;
  @ViewChild('emailInput') emailInput: any;
  @ViewChild('numeroContactoInput') numeroContactoInput: any;

  modoEdicion: boolean = false;

  // Cargar los datos a los inputs al iniciar la pantalla
  ngAfterViewInit (){
    this.nombreInput.nativeElement.value = this.empresa.nombre;
    this.rubroInput.nativeElement.value = this.empresa.rubro;
    this.nitInput.nativeElement.value = this.empresa.nit;
    this.srcLogo = this.empresa.logo;
    this.direccionInput.nativeElement.value = this.empresa.direccion;
    this.emailInput.nativeElement.value = this.empresa.email;
    this.numeroContactoInput.nativeElement.value = this.empresa.numeroContacto;
    //Deshabilitar los inputs
    this.habilitar();
  }

  // Habilitar los inputs para editar
  editar () {
    this.modoEdicion = true;
    this.habilitar();
  }

  // Guardar cambios
  guardar () {
    this.modoEdicion = false;
    this.habilitar();
    this.empresa.nombre = this.nombreInput.nativeElement.value;
    this.empresa.rubro = this.rubroInput.nativeElement.value;
    this.empresa.nit = this.nitInput.nativeElement.value;
    this.empresa.direccion = this.direccionInput.nativeElement.value;
    this.empresa.email = this.emailInput.nativeElement.value;
    this.empresa.numeroContacto = this.numeroContactoInput.nativeElement.value;
  }

  // Cancelar cambios
  cancelar () {
    this.modoEdicion = false;
    this.habilitar();
    this.nombreInput.nativeElement.value = this.empresa.nombre;
    this.rubroInput.nativeElement.value = this.empresa.rubro;
    this.nitInput.nativeElement.value = this.empresa.nit;
    this.direccionInput.nativeElement.value = this.empresa.direccion;
    this.emailInput.nativeElement.value = this.empresa.email;
    this.numeroContactoInput.nativeElement.value = this.empresa.numeroContacto;
  }

  // Habilitar campos inputs
  habilitar () {
    this.nombreInput.nativeElement.disabled = !this.modoEdicion;
    this.rubroInput.nativeElement.disabled = !this.modoEdicion;
    this.nitInput.nativeElement.disabled = !this.modoEdicion;
    this.direccionInput.nativeElement.disabled = !this.modoEdicion;
    this.emailInput.nativeElement.disabled = !this.modoEdicion;
    this.numeroContactoInput.nativeElement.disabled = !this.modoEdicion;
  }
}
