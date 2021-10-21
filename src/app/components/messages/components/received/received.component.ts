import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
import { Global } from 'src/app/services/global';
import { FollowSevice } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { Follow } from 'src/app/models/follow';
@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  providers: [UserService, FollowSevice, MessageService],
})
export class ReceivedComponent implements OnInit {
  title: string;
  url: string;
  identity!: any;
  token!: string;
  page!: any;
  next_page!: any;
  prev_page!: any;
  total!: any;
  pages!: any;
  userPageId: any;
  messages!: Message[];
  status!: string;
  follows: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowSevice,
    private _messageService: MessageService
  ) {
    this.title = 'Mensajes Recibidos';
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    console.log('received.component cargado...');
    this.actualPage();
  }
  actualPage() {
    this._route.params.subscribe((params) => {
      let page = +params['page'];
      this.page = page;

      if (!params['page']) {
        page = 1;
      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }
      //DEVOLVER LISTADO DE USUARIO
      this.getMessages(this.token, this.page);
    });
  }

  getMessages(token: any, page: any) {
    this._messageService.getMyMessages(token, page).subscribe(
      (response) => {
        console.log(response);
        if (!response.messages) {
          this.status = 'error';
        } else {
          this.messages = response.messages;
          this.total = response.total;
          this.pages = response.pages;
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
}
