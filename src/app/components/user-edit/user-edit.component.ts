import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService],
})
export class UserEditComponent implements OnInit {
  public title: string;
  public url: String;
  public user: User;
  public status!: string;
  public identity: any;
  public filesToUpload: Array<File>;
  public token!: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService
  ) {
    this.title = 'ACTUALIZAR MIS DATOS';
    this.filesToUpload = [];
    this.url = Global.url;
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    console.log(this.user);

    console.log('componente user-edit se ha cargado!!');
  }

  onSubmit() {
    this._userService.updateUser(this.user).subscribe(
      (response) => {
        console.log(response);
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;

          // SUBIDA DE IMAGEN DEL USUARIO
          //SUBIR LA IMAGEN
          this._uploadService
            .makeFileRequest(
              this.url + 'upload-image-user/' + this.user._id,
              [],
              this.filesToUpload,
              this.token,
              'image'
            )
            .then((result: any) => {
              this.user.image = result.user.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
            })
            .catch((e) => {
              console.log(e);
            });
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

  filechangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
