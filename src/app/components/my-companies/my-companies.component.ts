import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDto } from 'src/app/dto/company.dto';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css']
})
export class MyCompaniesComponent {

  //Obtener las compañias del usuario
  companies: CompanyDto[] = [
    {
      companyId: 1,
      companyName: "TechNova Solutions",
      urlIconImage: "../../../assets/company-1.svg",
      userId: 1
    },
    {
      companyId: 2,
      companyName: "GreenEco Ventures",
      urlIconImage: "../../../assets/company-2.svg",
      userId: 1
    },
    {
      companyId: 3,
      companyName: "StellarCraft Industries",
      urlIconImage: "../../../assets/company-3.svg",
      userId: 1
    },
    {
      companyId: 4,
      companyName: "AquaWave Technologies",
      urlIconImage: "../../../assets/company-4.svg",
      userId: 1
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  saveData(companyId: number, userId: number) {
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('companyId', companyId.toString());
    window.location.href = '/configuration-tap/1';
  }
}