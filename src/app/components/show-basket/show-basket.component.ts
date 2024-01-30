import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Basket } from '../../models/Basket';

@Component({
  selector: 'app-show-basket',
  templateUrl: './show-basket.component.html',
  styleUrl: './show-basket.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowBasketComponent implements OnInit {

  allOrders: Basket[] = [];
  totalItemsPrice: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor() {}

  ngOnInit(): void {
    let loggedUserString = localStorage.getItem("loggedInUser");
    if(loggedUserString != null) {
      let loggedUser = JSON.parse(loggedUserString);
      let allOrdersString = localStorage.getItem("orders_" + loggedUser.username);

      if(allOrdersString != null) {
        this.allOrders = JSON.parse(allOrdersString);
        
        for(let i = 0; i < this.allOrders.length; i++) {
          this.totalItemsPrice += this.allOrders[i].totalPrice;
        }

        console.log(this.allOrders.length)
      }
    }
  }

  get showOrdersOnThePage(): Basket[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allOrders.slice(startIndex, endIndex);
  }

  getAllPages(): number[] {
    let totalPages = Math.ceil(this.allOrders.length / this.itemsPerPage);
    let pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    let totalPages = Math.ceil(this.allOrders.length / this.itemsPerPage);

    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  confirmOrder(): void {
    // reset svega
  }
}
