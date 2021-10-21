import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { UserService } from 'src/app/services/user.service';
import { Global } from 'src/app/services/global';
import { PublicationSevice } from 'src/app/services/publication.service';
@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [UserService, PublicationSevice],
})
export class PublicationsComponent implements OnInit {
  title: string;
  url: string;
  identity!: any;
  token!: string;
  status!: string;
  page: any;
  total!: any;
  pages!: any;
  itemsPerPage!: any;
  publications!: Publication[];

  @Input() user!: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationSevice
  ) {
    this.title = 'publications';
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.page = 1;
  }
  ngOnInit(): void {
    console.log('componente.publications cargado...');
    this.getPublications(this.user, this.page);
  }

  getPublications(user: any, page: any, adding = false) {
    this._publicationService
      .getPublicationsUser(this.token, user, page)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.publications) {
            this.total = response.total_items;
            this.pages = response.pages;
            this.itemsPerPage = response.items_per_page;
            this.publications = response.publications;

            if (!adding) {
              this.publications = response.publications;
            } else {
              let arrayA = this.publications;
              let arrayB = response.publications;
              this.publications = arrayA.concat(arrayB);

              $('html,body').animate(
                { scrollTop: $('html').prop('scrollHeight') },
                500
              );
            }

            if (page > this.pages) {
              //this._router.navigate(['/home']);
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

  public noMore = false;
  viewMore() {
    this.page += 1;
    if (this.page == this.pages) {
      this.noMore = true;
    }
    this.getPublications(this.user,this.page, true);
  }
}
