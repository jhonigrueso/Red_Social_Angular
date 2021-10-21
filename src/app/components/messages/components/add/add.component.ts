import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
import { Global } from 'src/app/services/global';
import { FollowSevice } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  providers: [UserService, FollowSevice, MessageService],
})
export class AddComponent implements OnInit {
  title: string;
  url: string;
  identity!: any;
  token!: string;
  message: Message;
  status!: string;
  follows: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowSevice,
    private _messageService: MessageService
  ) {
    this.title = 'Enviar Mensajes';
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.message = new Message('', '', '', '', this.identity._id, '');
  }

  ngOnInit(): void {
    console.log('add.component cargado...');
    this.getMyFollows();
  }

  onSumbit(form: any) {
    console.log(this.message);
    this._messageService.addMessage(this.token, this.message).subscribe(
      (response) => {
        console.log(response);
        if (response.message) {
          this.status = 'success';
          form.reset();
        }
      },
      (error) => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getMyFollows() {
    this._followService.getMyFollows(this.token).subscribe(
      (response) => {
        console.log(response);
        this.follows = response.follows;
      },
      (error) => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
}
