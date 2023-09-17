import { Component } from '@angular/core';

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

}
