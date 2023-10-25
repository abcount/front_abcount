import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDto } from 'src/app/dto/company.dto';
import {HttpClient} from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../general-components/message.dialog/message.dialog.component';
import { InvitationStateDto } from 'src/app/dto/userinvitation.dto';

@Component({
  selector: 'app-my-companies',
  templateUrl: './my-companies.component.html',
  styleUrls: ['./my-companies.component.css']
})
export class MyCompaniesComponent implements OnInit{
  companies: CompanyDto[]
  pendingInvitation : InvitationStateDto[] = []
  constructor(private router: Router,
    private userService: UserService,
    private dataService: DataService,
    private dialog: MatDialog) {

    }

  async ngOnInit() {
    localStorage.clear();
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

          },
          error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
        });
        this.userService.getInvitationsPending().subscribe({
          next: (response) => {
            console.log(response)
            if(response.data){
              this.pendingInvitation = response.data.PENDING
            }

          },
          error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
        })
      },
      error: (error) => console.log("Error fetching user Info", error)
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

<<<<<<< HEAD
  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    localStorage.clear();
    this.httpClient.get('http://localhost:8080/users/info').subscribe((data: any) => {
      console.log(data);
    });

  }
=======
  */



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
  getImageProfile(path: string | null | undefined) {
    if(path == undefined){
      return '../../../assets/pfp.svg';
    }
    if (path != null && path.trim.length > 0) {
      return path;
    }
    return '../../../assets/pfp.svg';
  }

  confirmInvitation(index:number) {
    console.log('Aceptar invitación');

    // accept or decline
    this.userService.willAceptInvitation(true, this.pendingInvitation[index].invitationId).subscribe({
      next: (response) => {
        console.log(response)
        if(response.success){
          // call companies
          this.userService.getCompaniesByUser().subscribe({
            next: (response) => {
              console.log(response)
              if(response.data){
                this.companies = response.data
              }

            },
            error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
          });

          this.userService.getInvitationsPending().subscribe({
            next: (response) => {
              console.log(response)
              if(response.data){
                this.pendingInvitation = response.data.PENDING
              }
  
            },
            error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
          })
        }

      },
      error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
    });

    this.closeWindow()// Cierra el cuadro de diálogo
    
  }

  cancelDelete(index:number) {
    // Cancela la eliminación aquí
    console.log('Rechazar invitación');

   
    this.userService.willAceptInvitation(false, this.pendingInvitation[index].invitationId).subscribe({
      next: (response) => {
        console.log(response)
        if(response.success){

          this.userService.getInvitationsPending().subscribe({
            next: (response) => {
              console.log(response)
              if(response.data){
                this.pendingInvitation = response.data.PENDING
              }
  
            },
            error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
          });
          
        }

      },
      error: (error) => console.log("Error >>>>>>>>>>>>>>>>>>>>>>>>", error)
    });

    this.closeWindow()// Cierra el cuadro de diálogo
  }

  closeWindow(){
    this.isDialogVisible = false;
  }
}
