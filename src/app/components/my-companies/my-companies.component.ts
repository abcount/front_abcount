import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDto } from 'src/app/dto/company.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css']
})
export class MyCompaniesComponent implements OnInit{
  companies: CompanyDto[] 
  constructor(private router: Router, 
    private userService: UserService) { }
  ngOnInit(): void {
    localStorage.clear();
    // cal first api
    this.userService.getInfoUser().subscribe({
      next: (response) =>{
        console.log(response)
      }
    })
    // call companies
    this.userService.getCompaniesByUser().subscribe({
      next: (response) => {
        console.log(response)
        if(response.data){
          this.companies = response.data
        }
        
      },
      error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
     })
  }
  //Obtener las compañias del usuario
  /* 
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

  */

  

  saveData(companyId: number, userId: number) {
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('companyId', companyId.toString());
    window.location.href = '/configuration-tap/1';
  }
}