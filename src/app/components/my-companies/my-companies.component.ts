import { Component } from '@angular/core';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css']
})
export class MyCompaniesComponent {

  //Obtener las compañias del usuario
  companies = [
    {
      companyId: 1,
      companyName: "TechNova Solutions",
      companyLogo: "../../../assets/company-1.svg"
    },
    {
      companyId: 2,
      companyName: "GreenEco Ventures",
      companyLogo: "../../../assets/company-2.svg"
    },
    {
      companyId: 3,
      companyName: "StellarCraft Industries",
      companyLogo: "../../../assets/company-3.svg"
    },
    {
      companyId: 4,
      companyName: "AquaWave Technologies",
      companyLogo: "../../../assets/company-4.svg"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
