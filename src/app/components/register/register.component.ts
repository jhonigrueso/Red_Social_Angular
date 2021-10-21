import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  title: string;
  user: User;
  status!: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Registrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
    console.log('componente registro cargado...');
  }

  onSubmit(form: any) {
    this._userService.saveUser(this.user).subscribe(
      (response) => {
        if (response.user && response.user._id) {
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error'
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
