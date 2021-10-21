import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { Global } from 'src/app/services/global';
import { Follow } from 'src/app/models/follow';
import { UserService } from 'src/app/services/user.service';
import { FollowSevice } from 'src/app/services/follow.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, FollowSevice],
})
export class ProfileComponent implements OnInit {
  title: string;
  url: string;
  identity!: any;
  token!: string;
  stats!: any;
  status!: string;
  user!: User;
  followed: boolean;
  following: boolean;
  constructor(
    private _userService: UserService,
    private _followService: FollowSevice,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'PERFIL DE USUARIO';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = Global.url;
    this.following = false;
    this.followed = false;
  }

  ngOnInit(): void {
    console.log('componente.profile a sido cargado');
    this.loadPage();
  }
  loadPage() {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    });
  }
  getUser(id: any) {
    this._userService.getUser(id).subscribe(
      (response) => {
        if (response.user) {
          this.user = response.user;
          if (response.followed && response.following._id) {
            this.following = true;
          } else {
            this.following = false;
          }

          if (response.followed && response.followed._id) {
            this.followed = true;
          } else {
            this.followed = false;
          }
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        let errorMessage = <any>error;
        console.log(errorMessage);
        this._router.navigate(['/perfil', this.identity._id]);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getCounters(id: any) {
    this._userService.getCounters(id).subscribe(
      (response) => {
        console.log(response);

        this.stats = response;
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

  followUser(followed: any) {
    let follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      (response) => {
        console.log(response);
        this.following = true;
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
  unfollowUser(followed: any) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      (response) => {
        console.log(response);
        this.following = false;
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
  followUserOver:any;
  mouseEnter(user_id:any){
    this.followUserOver=user_id;
  }
  mouseLeave(){
    this.followUserOver=0;
  }
}
