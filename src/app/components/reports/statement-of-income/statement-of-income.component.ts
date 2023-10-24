import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';


@Component({
  selector: 'app-statement-of-income',
  templateUrl: './statement-of-income.component.html',
  styleUrls: ['./statement-of-income.component.css']
})
export class StatementOfIncomeComponent {
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
