import { Component, OnInit , DoCheck} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  title:string;
  constructor() {
    this.title = 'Mensajes Privados';
  }

  ngOnInit(): void {
    console.log('main.component cargado...');

  }
}
