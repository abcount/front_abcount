import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDto } from 'src/app/dto/company.dto';
import {HttpClient} from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../general-components/message.dialog/message.dialog.component';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css']
})
export class MyCompaniesComponent implements OnInit{
  companies: CompanyDto[];

  constructor(private router: Router, private userService: UserService, private dataService: DataService, private dialog: MatDialog) { }

  loading: boolean = true;

  async ngOnInit() {
    localStorage.clear();
    this.loading = true; // Mostrar la barra de carga
    // cal first api
    this.userService.getInfoUser().subscribe({
      next: (response) =>{
        console.log(response)
        // call companies
        this.userService.getCompaniesByUser().subscribe({
          next: (response) => {
            console.log(response)
            if(response.data){
              this.companies = response.data
            }
            this.loading = false; // Ocultar la barra de carga cuando estén listos los datos
          },
          error: (error) => {
            console.log("Error fetching user Info", error);
            this.loading = false; // Asegúrate de ocultar la barra de carga en caso de error
          }
        })
      },
      error: (error) => {
        console.log("Error fetching user Info", error);
        this.loading = false; // Asegúrate de ocultar la barra de carga en caso de error
      }
    })
  }

  saveData(companyId: number, userId: number) {
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('companyId', companyId.toString());
    this.dataService.getExistExchangeRate().subscribe({
      next: (data) => {
        if(data.data){
          this.router.navigate(['/configuration-tap/1']);
        }else{
          this.router.navigate(['/exchangeAdd']);
        }
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          data: {title: 'Ocurrio un error!', message: "No se pudo conectar con el servidor"}
        });
      },
    });
  }

  //Obtener invitaciones de compañias
  invitaciones: any[] = [
    {
      companyId: 1,
      companyName: "TechNova Solutions",
      urlIconImage: "../../../assets/company-1.svg",
    },
    {
      companyId: 2,
      companyName: "GreenEco Ventures",
      urlIconImage: "../../../assets/company-2.svg",
    },
    {
      companyId: 3,
      companyName: "StellarCraft Industries",
      urlIconImage: "../../../assets/company-3.svg",
    },
    {
      companyId: 4,
      companyName: "AquaWave Technologies",
      urlIconImage: "../../../assets/company-4.svg",
    }
  ]

  // Logica popup
  
  isDialogVisible = false;
  popup() {
    console.log("popup")
    this.isDialogVisible = true;
  }


  confirmDelete() {
    console.log('Aceptar invitación');
    this.isDialogVisible = false; // Cierra el cuadro de diálogo
  }

  cancelDelete() {
    // Cancela la eliminación aquí
    console.log('Rechazar invitación');
    this.isDialogVisible = false; // Cierra el cuadro de diálogo
  }
}
