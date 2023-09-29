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
  subsidiariesBackup: any[] = [];
  areasBackup: any[] = [];

  //Constructor
  constructor(private router: Router, private ConfigurationService: ConfigurationService) { }

  ngOnInit() {
    // Obtener las sucursales y areas
    this.ConfigurationService.getSubsidiaries().subscribe(
      (data: any) => {
        this.subsidiaries = data.data.subsidiaries;
        this.areas = data.data.areas;
        this.subsidiariesBackup = data.data.subsidiaries;
        this.areasBackup = data.data.areas;
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
      let newSubsidiary = {
        subsidiaryName: this.controlSubsidiaryName.value,
        address: this.controlSubsidiaryAddress.value,
        editable: true
      }
      this.subsidiaries.push(newSubsidiary);
      this.controlSubsidiaryName.reset();
      this.controlSubsidiaryAddress.reset();
    }
  }
  //Lógica para eliminar una sucursal
  deleteSubsidiary(subsidiaryId: number) {
    let subsidiary = this.subsidiaries.find((subsidiary: any) => subsidiary.subsidiaryId === subsidiaryId);
    this.subsidiaries = this.subsidiaries.filter((subsidiary: any) => subsidiary.subsidiaryId !== subsidiaryId);
    if (this.subsidiaries.length == 0) {
      this.areas = [];
    }
  }

  // Logica para agregar area
  addArea() {
    const areasNames = this.areas.map((area: any) => area.areaName);
    if (areasNames.includes(this.controlAreaName.value)){
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
    this.deleteSubsidiaryArea();
    this.saveNew();
    //this.modeEdit = false;
  }

  // Lógica para guardar las nuevas sucursales y areas
  saveNew(){
    let subsidiaryNew: any = [];
    if (this.subsidiaries.length > 0) {
      this.subsidiaries.forEach((subsidiary: any) => {
        if (subsidiary.subsidiaryId == undefined) {
          subsidiaryNew.push({
            subsidiaryName: subsidiary.subsidiaryName,
            address: subsidiary.address
          });
        }
      });
    }
    let areaNew: any = [];
    if (this.areas.length > 0) {
      this.areas.forEach((area: any) => {
        if (area.areaId == undefined) {
          areaNew.push(area.areaName);
        }
      });
    }
    if (subsidiaryNew.length>0 || areaNew.length>0){
      this.ConfigurationService.addSubsidiaryArea(subsidiaryNew, areaNew).subscribe(
        (data: any) => {
          this.subsidiaries = data.data.subsidiaries;
          this.areas = data.data.areas;
          this.subsidiariesBackup = data.data.subsidiaries;
          this.areasBackup = data.data.areas;
        }
      );
    }
  }

  // Lógica para eliminar las sucursales y areas
  deleteSubsidiaryArea(){
    let subsidiaryDelete: any = [];
    if (this.subsidiaries.length > 0) {
      this.subsidiariesBackup.forEach((subsidiary: any) => {
        if (!this.subsidiaries.includes(subsidiary)) {
          subsidiaryDelete.push(subsidiary.subsidiaryId);
        }
      });
    }
    let areaDelete: any = [];
    if (this.areas.length > 0) {
      this.areasBackup.forEach((area: any) => {
        if (!this.areas.includes(area)) {
          areaDelete.push(area.areaId);
        }
      });
    }
    if(subsidiaryDelete.length>0 || areaDelete.length>0){
      this.ConfigurationService.deleteSubsidiaryArea(subsidiaryDelete, areaDelete).subscribe(
        (data: any) => {
          this.subsidiaries = data.data.subsidiaries;
          this.areas = data.data.areas;
          this.subsidiariesBackup = data.data.subsidiaries;
          this.areasBackup = data.data.areas;
        }
      );
    }
  }

  //Cancelar la edición
  cancel(){
    this.ConfigurationService.getSubsidiaries().subscribe(
      (data: any) => {
        this.subsidiaries = data.data.subsidiaries;
        this.areas = data.data.areas;
        this.subsidiariesBackup = data.data.subsidiaries;
        this.areasBackup = data.data.areas;
      }
    );
    this.modeEdit = false;
  }

  //Editar
  edit() {
    this.modeEdit = true;
  }
}