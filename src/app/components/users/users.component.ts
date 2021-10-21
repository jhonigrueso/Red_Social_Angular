import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Global } from 'src/app/services/global';
import { FollowSevice } from 'src/app/services/follow.service';
import { Follow } from 'src/app/models/follow';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, FollowSevice],
})
export class UsersComponent implements OnInit {
  title: string;
  url: string;
  identity!: any;
  token!: string;
  page!: any;
  next_page!: any;
  prev_page!: any;
  total!: any;
  pages!: any;
  users!: User[];
  follows!: any;
  status!: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowSevice
  ) {
    this.title = 'Gente';
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    console.log('users.component cargado');
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
      this.getUsers(page);
    });
  }

  getUsers(page: any) {
    this._userService.getUsers(page).subscribe(
      (response) => {
        console.log(response);
        if (!response.users) {
          this.status = 'error';
        } else {
          //console.log(response.users);
          this.total = response.total;
          this.users = response.users;
          this.pages = response.page;
          this.follows = response.users_following;

          console.log(this.follows);

          if (page > this.pages) {
            this._router.navigate(['/gente', 1]);
          }
          //this.status = 'success';
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

  public followUserOver: any;
  mouseEnter(user_id: any) {
    this.followUserOver = user_id;
  }
  mouseLeave(user_id: any) {
    this.followUserOver = 0;
  }

  // followed

  followUser(followed: any) {
    let follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      (response) => {
        if (!response.follow) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(followed);
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

  unfollowUser(followed: any) {

    this._followService.deleteFollow(this.token, followed).subscribe(
      (response) => {
        let search = this.follows.indexOf(followed)
        if (search != -1) {
          this.follows.splice(search,1)
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
