import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../models/Item';
import { Comments } from '../../models/Comments';

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

  constructor(private router:Router) {}

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
}
