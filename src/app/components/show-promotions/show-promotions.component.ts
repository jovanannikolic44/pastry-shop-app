import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Promotion } from '../../models/Promotion';

@Component({
  selector: 'app-show-promotions',
  templateUrl: './show-promotions.component.html',
  styleUrl: './show-promotions.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowPromotionsComponent implements OnInit {
  allPromotions: Promotion[] = [];

  constructor() {}

  ngOnInit(): void {
    let allPromotionsString = localStorage.getItem('promotions');
    this.allPromotions = allPromotionsString? JSON.parse(allPromotionsString) : [];
  }
}
