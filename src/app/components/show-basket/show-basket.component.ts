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
  requestId: number = 1;

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
      this.allOrders = allOrdersString? JSON.parse(allOrdersString) : [];

      if(this.allOrders.length != 0) {
        for(let i = 0; i < this.allOrders.length; i++) {
          this.totalItemsPrice += this.allOrders[i].totalPrice;
        }

        let requestIdString = localStorage.getItem('requestId');
        this.requestId = requestIdString ? parseInt(requestIdString) : 1;
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
      let ordersString = "";

      for(let i = 0; i < this.allOrders.length; i++) {
        if(i == this.allOrders.length - 1) {
          ordersString = ordersString + this.allOrders[i].itemName + "[" + this.allOrders[i].quantity + "]";
        }
        else {
          ordersString = ordersString + this.allOrders[i].itemName + "[" + this.allOrders[i].quantity + "], ";
        }
      }

      let loggedUser = JSON.parse(loggedUserString);
      let allRequestsString = localStorage.getItem("waitingRequests");
      let allRequests = allRequestsString? JSON.parse(allRequestsString) : [];

      if(allRequests.length == 0) {
        let newOrderRequest: OrderRequest = {
          id: this.requestId,
          username: loggedUser.username,
          items: ordersString,
          totalPrice: this.totalItemsPrice,
          acceptance: "requested"
        };

        this.requestId++;
        localStorage.setItem('requestId', this.requestId.toString());

        localStorage.setItem("waitingRequests", JSON.stringify([newOrderRequest]));
      }
      else {
        let newOrderRequest: OrderRequest = {
          id: this.requestId,
          username: loggedUser.username,
          items: ordersString,
          totalPrice: this.totalItemsPrice,
          acceptance: "requested"
        };

        this.requestId++;
        localStorage.setItem('requestId', this.requestId.toString());
        
        allRequests.push(newOrderRequest)
        localStorage.setItem("waitingRequests", JSON.stringify(allRequests));
      }

      this.allOrders = [];
      this.totalItemsPrice = 0;
      localStorage.removeItem("orders_" + loggedUser.username);
    }
  }
}
