import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  private static staticCommentId: number = 1;
  private commentId: number = ItemDetailsComponent.staticCommentId++;
  private static staticOrderId: number = 1;
  private orderId: number = ItemDetailsComponent.staticOrderId++;

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
      
      let newComment: Comments = {
        id: this.commentId.toString(),
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
    if(loggedUserString != null) {
      let loggedUser = JSON.parse(loggedUserString);
      
      let allOrdersString = localStorage.getItem("orders_" + loggedUser.username);

      if(allOrdersString == null) {
        let newPurchase: Basket = {
          id: this.orderId,
          itemName: this.itemToShow.name,
          quantity: this.orderQuantity,
          price: parseInt(this.itemToShow.price),
          totalPrice: this.orderQuantity * parseInt(this.itemToShow.price)
        };
        
        localStorage.setItem("orders_" + loggedUser.username, JSON.stringify([newPurchase]));
      }
      else {
        let allOrders = JSON.parse(allOrdersString);
        let newPurchase: Basket = {
          id: this.orderId,
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
