//modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
//Rutas
import { MessagesRoutingModule } from './messages.routing';

//componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

//SERVICIOS
import { UserService } from 'src/app/services/user.service';
import { UserGuard } from 'src/app/services/user.guard';
@NgModule({
  declarations: [
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent,
  ],
  imports: [CommonModule, FormsModule, MessagesRoutingModule, MomentModule],
  providers: [UserService, UserGuard],
})
export class MessagesModule {}
