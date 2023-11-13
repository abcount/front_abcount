import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MessageDialogComponent } from '../general-components/message.dialog/message.dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataService.getExistExchangeRate().subscribe({
      next: (data) => {
        if(!data.data){
          this.flagAddChange();
        }
      },
      error: (error) => {
        const message = this.dialog.open(MessageDialogComponent, {
          data: {title: 'Ocurrio un error!', message: "No se pudo conectar con el servidor. Intente de nuevo más tarde."}
        });
      }
    });
  }

  flagAdd: boolean = false;
  flagAddChange() {
    this.flagAdd = !this.flagAdd;
  }

}
