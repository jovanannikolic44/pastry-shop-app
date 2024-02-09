import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from '../../models/Promotion';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrl: './show-items.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowItemsComponent implements OnInit {
  constructor(private router:Router) {}

  ngOnInit(): void {}

  showAllCakes(): void {
    localStorage.setItem('cookiesOrCakes', "cakes");
    this.router.navigate(['/show-cakes']);
  }

  showAllCookies(): void {
    localStorage.setItem('cookiesOrCakes', "cookies");
    this.router.navigate(['/show-cakes']);
  }

  showAllPromotions(): void {
    this.router.navigate(['/show-promotions']);
  }

}
