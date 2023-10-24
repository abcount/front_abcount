import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-diary-book-form',
  templateUrl: './diary-book-form.component.html',
  styleUrls: ['./diary-book-form.component.css']
})
export class DiaryBookFormComponent {

  // subsidiaries = [
  //   {"subsidiaryId": 1,"subsidiaryName": "Sucursal 1","address": "Av. 6 de Agosto"},
  //   {"subsidiaryId": 2,"subsidiaryName": "Sucursal 2","address": "Av. 6 de Agosto"},
  //   {"subsidiaryId": 3,"subsidiaryName": "Sucursal 3","address": "Av. 6 de Agosto"},
  //   {"subsidiaryId": 4,"subsidiaryName": "Sucursal 4","address": "Av. 6 de Agosto"},
  // ];

  // areas = [
  //   {"areaId": 1,"areaName": "Area 1"},
  //   {"areaId": 2,"areaName": "Area 2"},
  //   {"areaId": 3,"areaName": "Area 3"},
  //   {"areaId": 4,"areaName": "Area 4"},
  // ];

   transactionTypes = [
     {"transactionTypeId": 1,"transactionTypeName": "Ingreso"},
     {"transactionTypeId": 2,"transactionTypeName": "Egreso"},
     {"transactionTypeId": 3,"transactionTypeName": "Traspaso"},
   ];

  // currencies = [
  //   {"currencyId": 1,"currencyName": "UFV"},
  //   {"currencyId": 2,"currencyName": "Dolares"},
  //   {"currencyId": 3,"currencyName": "Euros"},
  // ];
   //Listas de sucursales y areas
   subsidiaries: any[] = [];
   areas: any[] = [];
   currencies: any[] = [];
 
   //Constructor
   constructor(private router: Router, private configurationService: ConfigurationService) { }
 
   ngOnInit() {
     // Obtener las sucursales y areas
     this.configurationService.getSubsidiaries().subscribe(
       (data: any) => {
         console.log(data);
         this.subsidiaries = data.data.subsidiaries;
         this.areas = data.data.areas;
       }
     );
     this.configurationService.getCurrencies().subscribe((data: any) => {
       console.log(data);
       this.currencies = data.data.currencyConfig;
     });
   }
}
