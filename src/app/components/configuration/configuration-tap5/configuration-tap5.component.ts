import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-configuration-tap5',
  templateUrl: './configuration-tap5.component.html',
  styleUrls: ['./configuration-tap5.component.css']
})
export class ConfigurationTap5Component {
 
  constructor(private UserServices: UserService) { }
  //users: any[]=[];
  //Datos quemados en frotend
  users = [
    {
      userId: 1,
      firstName: "Sebastian",
      lastName: "Belmonte",
      email: "sebastian.belmonte@ucb.edu.bo"
    },
    {
      userId: 2,
      firstName: "Carlos",
      lastName: "Zarate",
      email: "carlos.zarate@ucb.edu.bo"
    },
    {
      userId: 3,
      firstName: "Juan",
      lastName: "Perez",
      email: "juan.perez@ucb.edu.bo"
    },
    {
      userId: 4,
      firstName: "Maria",
      lastName: "Gomez",
      email: "maria.gomez@ucb.edu.bo"
    }

  ];
  ngOnInit() {
    // Obtener usuarios
    //  this.UserServices.getUsers().subscribe(
    //    (data: any) => {
    //     console.log(data.data)
    //     this.users = data.data;
    //    }
    //  );
  }
  // Lógica para eliminar un usuario
  Eliminar(id: any){
    console.log("Usuario eliminado",id)
    this.UserServices.deleteUser(id).subscribe(
      (data: any) => {
        console.log(data)
      }
    );
  }
}
