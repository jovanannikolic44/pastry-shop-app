import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Basket } from '../../models/Basket';
import { OrderRequest } from '../../models/OrderRequest';

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
    let loggedUserString = localStorage.getItem("loggedInUser");
    if(loggedUserString != null) {
      let loggedUser = JSON.parse(loggedUserString);
      let allRequestsString = localStorage.getItem("waitingRequests");
      let nextId = 1;

      // convert allOrders to string, allOrders je niz basketa
      let ordersString = "";
      for(let i = 0; i < this.allOrders.length; i++) {
        if(i == this.allOrders.length - 1) {
          ordersString = ordersString + this.allOrders[i].itemName;
        }
        ordersString = ordersString + this.allOrders[i].itemName + "[" + this.allOrders[i].quantity + "], ";
      }

      if(allRequestsString == null) {
        let newOrderRequest: OrderRequest = {
          id: nextId,
          username: loggedUser.username,
          items: ordersString,
          totalPrice: this.totalItemsPrice,
          acceptance: "requested"
        };

        localStorage.setItem("waitingRequests", JSON.stringify([newOrderRequest]));
      }
      else {
        let allRequests = JSON.parse(allRequestsString);
        nextId = allRequests[allRequests.length - 1].id + 1;

        let newOrderRequest: OrderRequest = {
          id: nextId,
          username: loggedUser.username,
          items: ordersString,
          totalPrice: this.totalItemsPrice,
          acceptance: "requested"
        };
        
        allRequests.push(newOrderRequest)
        localStorage.setItem("waitingRequests", JSON.stringify(allRequests));
      }

      this.allOrders = [];
      this.totalItemsPrice = 0;
      localStorage.removeItem("orders_" + loggedUser.username);
    }
  }
}
