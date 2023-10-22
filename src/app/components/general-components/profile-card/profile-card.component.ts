import { Component , Input} from '@angular/core';
import { UserSearcherDto } from 'src/app/dto/areasubsroles.dto';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() user: UserSearcherDto;
  
  ngOnInit(){
    if(! this.user.imagePath){
      this.user.imagePath = "../../../../assets/usuario.png";
    }
  }
  
   
}
