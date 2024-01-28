import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from '../../models/Promotion';

@Component({
  selector: 'app-show-promotions',
  templateUrl: './show-promotions.component.html',
  styleUrl: './show-promotions.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowPromotionsComponent implements OnInit {
  allPromotions: Promotion[] = [];

  constructor(private router:Router) {}

  ngOnInit(): void {
    let allPromotionsString = localStorage.getItem('promotions');
    
    if(allPromotionsString == null) {
      return;
    }

    this.allPromotions = JSON.parse(allPromotionsString);
  }
}
