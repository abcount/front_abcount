import { Component } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration-tap4',
  templateUrl: './configuration-tap4.component.html',
  styleUrls: ['./configuration-tap4.component.css']
})
export class ConfigurationTap4Component {

  // Variables
  accountPlan: any[] = []; // Plan de cuentas
  modeEdit: boolean = false; // Modo edición

  constructor(private ConfigurationService: ConfigurationService) {}

  // Función al inicializar la pantalla
  ngOnInit() {
    this.ConfigurationService.getAccountsPlan().subscribe(
      (data: any) => {
        this.accountPlan = data.data;
      }
    );
  }

  // Función para activar el modo edición
  edit() {
    this.modeEdit = true;
  }

  // Función para desactivar el modo edición
  cancel() {
    this.modeEdit = false;
  }

  // Función para guardar los cambios
  save() {
    console.log('Guardando cambios...');
    this.modeEdit = false;
  }
}
