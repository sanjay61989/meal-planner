import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css',
})
export class MealListComponent {
  url: any;
  nameUrl: string = environment.assetsUrl + '/assets/name.gif';
  surnameUrl: string = environment.assetsUrl + '/assets/surname.gif';
  constructor() {
    this.url = environment.url;
  }
}
