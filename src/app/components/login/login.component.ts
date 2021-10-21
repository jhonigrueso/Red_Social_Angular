import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  title: string;
  public user: User;
  public status!: string;
  public identity: any;
  public token!: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'IDENTIFICATE';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
    console.log('componente login cargado...');
  }

  onSubmit() {
    //loguear al usuario y conseguir sus datos
    this._userService.signup(this.user).subscribe(
      (response) => {
        this.identity = response.user;

        if (!this.identity || !this.identity._id) {
          console.log(this.identity);
          this.status = 'error';
        } else {
          console.log(this.identity);
          //PERSISTIR LOS DATOS DEL USUARIO
          localStorage.setItem('identity', JSON.stringify(this.identity));
          //CONSEGUIR EL TOKEN
          this.getToken();
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

  getToken() {
    this._userService.signup(this.user, 'true').subscribe(
      (response) => {
        this.token = response.token;
        if (this.token.length <= 0) {
          this.status = 'error';
        } else {
          console.log(this.identity);
          //PERSISTIR EL TOKEN DEL USUARIO
          localStorage.setItem('token', JSON.stringify(this.token));
          //CONSEGUIR LOS CONTADORES O ESTADISTICAS DEL USUARIO
          this.getCounters();
        }
      },
      (error) => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }


  //!METODO QUEDA PENDIENTE PORQUE NO ME ESTA RETORNANDO LOS VALORES CORRECTO.
  getCounters() {
    this._userService.getCounters().subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
