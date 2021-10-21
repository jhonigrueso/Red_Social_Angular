import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { UserService } from 'src/app/services/user.service';
import { Global } from 'src/app/services/global';
import { PublicationSevice } from 'src/app/services/publication.service';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, PublicationSevice],
})
export class TimelineComponent implements OnInit {
  title: string;
  loading:boolean;
  url: string;
  identity!: any;
  token!: string;
  status!: string;
  page: any;
  total!: any;
  pages!: any;
  itemsPerPage!: any;
  publications!: Publication[];
  showImage: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationService: PublicationSevice
  ) {
    this.title = 'TimeLine';
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.page = 1;
    this.loading = true;
  }

  ngOnInit(): void {
    console.log('componente.timeline cargado...');
    this.getPublications(this.page);
  }

  getPublications(page: any, adding = false) {
    this._publicationService.getPublications(this.token, page).subscribe(
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
              1000
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
    this.getPublications(this.page, true);
  }

  refresh(event=null) {
    this.getPublications(1);
  }

  showThisImage(id: any) {
    this.showImage = id;
  }

  hideThisImage(id: any) {
    this.showImage = 0;
  }
  deletePublication(id: any) {
    this._publicationService.deletePublication(this.token, id).subscribe(
      (response) => {

this.refresh();
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
