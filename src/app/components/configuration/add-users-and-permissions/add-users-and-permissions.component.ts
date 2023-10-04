import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users-and-permissions',
  templateUrl: './add-users-and-permissions.component.html',
  styleUrls: ['./add-users-and-permissions.component.css']
})
export class AddUsersAndPermissionsComponent {

  constructor(private router: Router) { }

  cancel(){
    this.router.navigate(['/configuration-tap/5']);
  }
}
