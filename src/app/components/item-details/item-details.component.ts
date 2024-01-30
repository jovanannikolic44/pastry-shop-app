import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../models/Item';
import { Comments } from '../../models/Comments';
import { Basket } from '../../models/Basket';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ItemDetailsComponent implements OnInit {

  itemToShow!: Item;
  inputComment: string = "";
  allComments: Comments[] = [];
  orderQuantity: number = 1;
  message: string = "";

  constructor() {}

  ngOnInit(): void {
    let itemToShowString = localStorage.getItem('itemToShow');
    if(itemToShowString != null) {
      this.itemToShow = JSON.parse(itemToShowString);
      
      let allCommentsString = localStorage.getItem(this.itemToShow.id);
      if(allCommentsString != null) {
        this.allComments = JSON.parse(allCommentsString)
      }
    }
  }

  saveComment(): void {
    let loggedUserString = localStorage.getItem("loggedInUser");
    if(loggedUserString != null) {
      let loggedUser = JSON.parse(loggedUserString);
      let nextId = "";

      if(this.allComments.length > 0) {
        nextId = (parseInt(this.allComments[this.allComments.length - 1].id) + 1).toString();
      }
      else {
        nextId = "1";
      }
      
      let newComment: Comments = {
        id: nextId,
        username: loggedUser.username,
        comment: this.inputComment
      };

      this.allComments.push(newComment);
      localStorage.setItem(this.itemToShow.id, JSON.stringify(this.allComments));
    }
  }

  orderItem(): void {
    if(this.orderQuantity < 1 || this.orderQuantity > 20) {
      this.message = "Narudzbina sa zadatom kolicinom nije moguca.";
      return;
    }

    let loggedUserString = localStorage.getItem("loggedInUser");
    let nextId = 1;

    if(loggedUserString != null) {
      let loggedUser = JSON.parse(loggedUserString);
      
      let allOrdersString = localStorage.getItem("orders_" + loggedUser.username);

      if(allOrdersString == null) {
        let newPurchase: Basket = {
          id: nextId,
          itemName: this.itemToShow.name,
          quantity: this.orderQuantity,
          price: parseInt(this.itemToShow.price),
          totalPrice: this.orderQuantity * parseInt(this.itemToShow.price)
        };
        
        localStorage.setItem("orders_" + loggedUser.username, JSON.stringify([newPurchase]));
      }
      else {
        let allOrders = JSON.parse(allOrdersString);
        nextId = allOrders[allOrders.length - 1].id + 1;

        let newPurchase: Basket = {
          id: nextId,
          itemName: this.itemToShow.name,
          quantity: this.orderQuantity,
          price: parseInt(this.itemToShow.price),
          totalPrice: this.orderQuantity * parseInt(this.itemToShow.price)
        };
        
        allOrders.push(newPurchase)
        localStorage.setItem("orders_" + loggedUser.username, JSON.stringify(allOrders));
      }
      this.orderQuantity = 1;
      this.message = "Narudzbina je evidentirana. Mozete je naci u korpi.";
    }
  }
}
