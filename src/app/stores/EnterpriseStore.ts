import { Injectable, inject } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import  {Enterprise} from '../models/configEnterprise';

import {
  EntitiesRef,
  EntitiesState,
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  selectEntityByPredicate,
  selectManyByPredicate,
  updateEntities,
  upsertEntities,
  withEntities,
} from '@ngneat/elf-entities';
import { OperatorFunction } from 'rxjs';

const store = createStore(
    { name: 'enterprise' },
    withEntities<Enterprise>(),
);
@Injectable({ providedIn: 'root' })
export class EnterpriseStore {

    enterprise$ = store.pipe(selectAllEntities());


    addEnterprise(enterprise: Enterprise) {
        store.update(addEntities(enterprise));
    }


}