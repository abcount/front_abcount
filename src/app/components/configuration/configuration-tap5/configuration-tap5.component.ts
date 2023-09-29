import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-configuration-tap5',
  templateUrl: './configuration-tap5.component.html',
  styleUrls: ['./configuration-tap5.component.css']
})
export class ConfigurationTap5Component {
 
  constructor(private UserServices: UserService) { }
  users: any[]=[];
  ngOnInit() {
    // Obtener usuarios
     this.UserServices.getUsers().subscribe(
       (data: any) => {
        console.log(data.data)
        this.users = data.data;
       }
     );
  }
}
