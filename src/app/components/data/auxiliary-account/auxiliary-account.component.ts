import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuxiliaryDto} from "../../../dto/auxiliary.dto";
import {DataService} from "../../../services/data.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-auxiliary-account',
  templateUrl: './auxiliary-account.component.html',
  styleUrls: ['./auxiliary-account.component.css']
})
export class AuxiliaryAccountComponent {

  auxiliaryForm: FormGroup;
  auxiliary: AuxiliaryDto[] = [];
  newAuxiliary: AuxiliaryDto ={ auxiliaryCode: '', auxiliaryName: '' };
  columnsToDisplay = ['nro', 'codigo', 'nombre', 'acciones'];

  auxiliaryCode = { labelAuxiliaryCode: 'Codigo', placeholderAuxiliaryCode: 'Ingrese el codigo del auxiliar'};
  auxiliaryName = { labelAuxiliaryName: 'Nombre', placeholderAuxiliaryName: 'Ingrese el nombre del auxiliar'};

  controlAuxiliaryCode = new FormControl;

  controlAuxiliaryName = new FormControl;
  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';

  selectedAuxiliary?: AuxiliaryDto;

  constructor(private dataService: DataService) {
  }

  addAuxiliary(auxiliaryData: AuxiliaryDto): void {
    this.dataService.createAuxiliary(auxiliaryData).subscribe({
      next: (data) => {
        this.controlAuxiliaryCode.reset();
        this.controlAuxiliaryName.reset();
        if(data.success){
          this.auxiliary = data.data!;
        }
      },
      error: (error) => {
        //TODO: mostrar mensaje de error
        console.log(error)
      }
    }
    );
  }


  addOrUpdateAuxiliary(): void {
    const auxiliaryData: AuxiliaryDto = {
      auxiliaryCode: this.controlAuxiliaryCode.value,
      auxiliaryName: this.controlAuxiliaryName.value
    };

    if (this.selectedAuxiliary) {
      auxiliaryData.auxiliaryId = this.selectedAuxiliary.auxiliaryId;
      this.editAuxiliary(auxiliaryData);
      this.selectedAuxiliary = undefined; // Reset after editing
    } else {
      this.addAuxiliary(auxiliaryData);
    }
  }


  getAuxiliaries(): void {
    this.dataService.getAllAuxiliaries().subscribe(
      (response: any) => {
        this.auxiliary = response.data;
      },
      error => {
        console.error('Error fetching auxiliaries', error);
      }
    );
  }
  editAuxiliary(auxiliary: AuxiliaryDto): void {
    this.dataService.updateAuxiliary(auxiliary).subscribe({
      next: (data) => {
        this.auxiliary = data.data!;
      },
      error: (error) => {
        //TODO: mostrar mensaje de error
        console.log(error)
      },
      complete: () => {
        this.cancelEdit();
      }
    }
    );
    
  }

  deleteAuxiliary(auxiliary: AuxiliaryDto): void {
    this.dataService.deleteAuxiliary(auxiliary.auxiliaryId!).subscribe(
      () => {
        this.auxiliary = this.auxiliary.filter(a => a.auxiliaryId !== auxiliary.auxiliaryId);
      },
      error => {
        console.error('Error deleting auxiliary', error);
      }
    );
  }

  loadAuxiliaryForEdit(auxiliary: AuxiliaryDto): void {
    console.log(auxiliary.auxiliaryId);
    this.selectedAuxiliary = { ...auxiliary };
    this.controlAuxiliaryCode.setValue(this.selectedAuxiliary.auxiliaryCode);
    this.controlAuxiliaryName.setValue(this.selectedAuxiliary.auxiliaryName);
  }

  cancelEdit(): void {
    this.selectedAuxiliary = undefined;
    this.controlAuxiliaryCode.reset();
    this.controlAuxiliaryName.reset();
  }



  ngOnInit(): void{
    this.getAuxiliaries();
  }

}
