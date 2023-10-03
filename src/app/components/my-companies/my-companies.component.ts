import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  saveCompanyId(companyId: number){
    localStorage.clear();
    localStorage.setItem('companyId', companyId.toString());
    this.router.navigate(['/configuration-tap/1']);
  }
}
