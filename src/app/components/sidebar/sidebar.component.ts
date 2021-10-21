import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Global } from 'src/app/services/global';
import { Publication } from 'src/app/models/publication';
import { PublicationSevice } from 'src/app/services/publication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationSevice, UploadService],
})
export class SidebarComponent implements OnInit {
  url: string;
  identity!: any;
  token!: string;
  stats!: any;
  status!: string;
  publication!: Publication;

  constructor(
    private _userService: UserService,
    private _publicationService: PublicationSevice,
    private _route: ActivatedRoute,
    private _router: Router,
    private _uploadService: UploadService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = Global.url;
    this.publication = new Publication('', '', '', '', this.identity._id);
  }

  ngOnInit(): void {
    console.log('componente.sidebar a sido cargado');
  }

  onSubmit(form: any,event:any) {
    this._publicationService
      .addPublication(this.token, this.publication)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.publication) {
            //this.publication = response.publication;

            if (this.filesToUpload && this.filesToUpload.length) {
              //SUBIR LA IMAGEN
              this._uploadService
                .makeFileRequest(
                  this.url + 'upload-image-pub/' + response.publication._id,
                  [],
                  this.filesToUpload,
                  this.token,
                  'image'
                )
                .then((result: any) => {
                  this.publication.file = result.publication.image;
                  this.status = 'success';
                  form.reset();
                  this._router.navigate(['/timeline']);
                      this.sended.emit({ send: 'true' });
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              this.status = 'success';
              form.reset();
              this._router.navigate(['/timeline']);
              this.sended.emit({ send: 'true' });
            }
          } else {
            this.status = 'error';
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

  public filesToUpload!: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  //output
  @Output() sended = new EventEmitter();
}
