import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-and-permissions',
  templateUrl: './users-and-permissions.component.html',
  styleUrls: ['./users-and-permissions.component.css']
})
export class UsersAndPermissionsComponent {

  user = {
    "userId": 5,
    "firstName": "Carlos",
    "lastName": "Zarate",
    "email": "carlos.zarate@ucb.edu.bo"
  }

  constructor(private router: Router) { }

  cancel(){
    this.router.navigate(['/configuration-tap/5']);
  }
}
