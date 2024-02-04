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
  commentId: number = 1;
  orderId: number = 1;

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
      this.allComments = allCommentsString? JSON.parse(allCommentsString) : [];

      let commentIdString = localStorage.getItem('commentId');
      this.commentId = commentIdString ? parseInt(commentIdString) : 1;
      let orderIdString = localStorage.getItem('orderId');
      this.orderId = orderIdString ? parseInt(orderIdString) : 1;
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

      this.commentId++;
      localStorage.setItem('commentId', this.commentId.toString());

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
      let allOrders = allOrdersString? JSON.parse(allOrdersString) : [];

      let newPurchase: Basket = {
        id: this.orderId,
        itemName: this.itemToShow.name,
        quantity: this.orderQuantity,
        price: parseInt(this.itemToShow.price),
        totalPrice: this.orderQuantity * parseInt(this.itemToShow.price)
      };

      allOrders.push(newPurchase)
      localStorage.setItem("orders_" + loggedUser.username, JSON.stringify(allOrders));

      this.orderId++;
      localStorage.setItem('orderId', this.orderId.toString());

      this.orderQuantity = 1;
      this.message = "Narudzbina je evidentirana. Mozete je naci u korpi.";
    }
  }
}
