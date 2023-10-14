import { Component } from '@angular/core';
import {AuxiliaryDto} from "../../../dto/auxiliary.dto";
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {EntityDto} from "../../../dto/entity.dto";

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent {
  entity: EntityDto[] = [];
  columnsToDisplay = ['nro', 'nombre', 'nit', 'razonSocial', 'extranjera', 'acciones'];

  controlEntityName = new FormControl();
  controlEntityNit = new FormControl();
  controlEntitySocialReason = new FormControl();
  controlEntityForeign = new FormControl(false); // checkbox

  patternAll = '.*';
  patternAllMessage = 'Ingrese un valor válido';

  selectedEntity?: EntityDto;

  constructor(private dataService: DataService) {}

  addEntity(entityData: EntityDto): void {
    this.dataService.createEntity(entityData).subscribe(
      (entity: EntityDto) => {
        this.entity.push(entity);
        this.controlEntityName.reset();
        this.controlEntityNit.reset();
        this.controlEntitySocialReason.reset();
        this.controlEntityForeign.reset();
      },
      error => {
        console.error('Error to create entity', error);
      }
    );
  }

  editEntity(entity: EntityDto): void {
    this.dataService.updateEntity(entity).subscribe(
      (updatedEntity: EntityDto) => {
        const index = this.entity.findIndex(e => e.entityId === updatedEntity.entityId);
        if (index !== -1) {
          this.entity[index] = updatedEntity;
        }
      },
      error => {
        console.error('Error updating entity', error);
      }
    );
  }

  deleteEntity(entity: EntityDto): void {
    this.dataService.deleteEntity(entity.entityId!).subscribe(
      () => {
        this.entity = this.entity.filter(e => e.entityId !== entity.entityId);
      },
      error => {
        console.error('Error deleting entity', error);
      }
    );
  }

  loadEntityForEdit(entity: EntityDto): void {
    console.log(entity.entityId);
    this.selectedEntity = { ...entity };
    this.controlEntityName.setValue(this.selectedEntity.entityName);
    this.controlEntityNit.setValue(this.selectedEntity.entityNit);
    this.controlEntitySocialReason.setValue(this.selectedEntity.entitySocialReason);
    this.controlEntityForeign.setValue(this.selectedEntity.foreign);
  }

  addOrUpdateEntity(): void {
    const entityData: EntityDto = {
      entityName: this.controlEntityName.value,
      entityNit: this.controlEntityNit.value,
      entitySocialReason: this.controlEntitySocialReason.value,
      foreign: this.controlEntityForeign.value || false

    };

    if (this.selectedEntity) {
      entityData.entityId = this.selectedEntity.entityId;
      this.editEntity(entityData);
      this.selectedEntity = undefined; // Reset after editing
    } else {
      this.addEntity(entityData);
    }
  }

  cancelEdit(): void {
    this.selectedEntity = undefined;
    this.controlEntityNit.reset();
    this.controlEntityName.reset();
    this.controlEntitySocialReason.reset();
    this.controlEntityForeign.reset();
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this.dataService.getAllEntities().subscribe(
      (response: any) => {
        this.entity = response.data;
      },
      error => {
        console.error('Error fetching entities', error);
      }
    );
  }
}
