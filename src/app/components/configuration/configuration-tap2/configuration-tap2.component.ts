import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';

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

  // Controladores para los inputs
  controlSubsidiaryName: FormControl = new FormControl('', []);
  controlSubsidiaryAddress: FormControl = new FormControl('', []);
  controlAreaName: FormControl = new FormControl('', []);
  patternAll = '.*';

  // Variable para controlar el modo edición
  modeEdit: boolean = false;

  // Variables para mensajes de error
  @ViewChild('errorMessageSucursal') errorMessageSucursal: ElementRef;
  messageSucursal: string = 'La sucursal ya existe';
  @ViewChild('errorMessageArea') errorMessageArea: ElementRef;
  messageArea: string = 'El área ya existe';
  
  //Listas de sucursales y areas
  subsidiaries: any[] = [];
  areas: any[] = [];

  //Constructor
  constructor(private router: Router, private ConfigurationService: ConfigurationService) { }

  ngOnInit() {
    // Obtener las sucursales y areas
    this.ConfigurationService.getSubsidiaries().subscribe(
      (data: any) => {
        this.subsidiaries = data.subsidiaries;
        this.areas = data.areas;
      }
    );
  }

  // Lógica para agregar una sucursal
  addSubsidiary() {
    const subsidiariesNames = this.subsidiaries.map((subsidiary: any) => subsidiary.subsidiaryName);
    if (subsidiariesNames.includes(this.controlSubsidiaryName.value)) {
      this.errorMessageSucursal.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageSucursal.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.subsidiaries.push({
        subsidiaryName: this.controlSubsidiaryName.value,
        address: this.controlSubsidiaryAddress.value,
        editable: true
      });
      this.controlSubsidiaryName.reset();
      this.controlSubsidiaryAddress.reset();
    }
  }
  //Lógica para eliminar
  deleteSubsidiary(sucursalName: string) {
    this.subsidiaries = this.subsidiaries.filter((subsidiary: any) => subsidiary.subsidiaryName !== sucursalName);
    if (this.subsidiaries.length == 0) {
      this.areas = [];
    }
  }

  // Logica para agregar area
  addArea() {
    if (this.areas.includes(this.controlAreaName.value)){
      this.errorMessageArea.nativeElement.classList.add('show');
      setTimeout(() => {
        this.errorMessageArea.nativeElement.classList.remove('show');
      }, 2000);
    } else {
      this.areas.push({
        areaName: this.controlAreaName.value,
        editable: true
      });
      this.controlAreaName.reset();
    }
  }
  //Logica para eliminar area
  deleteArea(areaName: string) {
    this.areas = this.areas.filter((area: string) => area !== areaName);
  }

  //Lógica para mostrar y ocultar hijos
  toggleChildren(elemento: Elemento): void {
    elemento.mostrarHijos = !elemento.mostrarHijos;
  }

  //Verificar si existe alguna sucursal y area
  save(){
    this.ConfigurationService.updateSubsidiaryArea(this.subsidiaries, this.areas).subscribe(
      (data: any) => {
        console.log(data);
      }
    );
    this.modeEdit = false;
  }

  //Cancelar la edición
  cancel(){
    this.ConfigurationService.getSubsidiaries().subscribe(
      (data: any) => {
        this.subsidiaries = data.subsidiaries;
        this.areas = data.areas;
      }
    );
    this.modeEdit = false;
  }

  //Editar
  edit() {
    this.modeEdit = true;
  }
}