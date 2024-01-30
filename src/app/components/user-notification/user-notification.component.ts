import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderRequest } from '../../models/OrderRequest';

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UserNotificationComponent implements OnInit {
  allNotifications: OrderRequest[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor() {}

  ngOnInit(): void {
    let loggedUserString = localStorage.getItem("loggedInUser");

    if(loggedUserString != null) {
      let loggedUser = JSON.parse(loggedUserString);
      
      let allNotificationsString = localStorage.getItem("staffdecision_" + loggedUser.username);
      if(allNotificationsString != null) {
        this.allNotifications = JSON.parse(allNotificationsString);
      }
    }
  }

  get showNotificationsOnThePage(): OrderRequest[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allNotifications.slice(startIndex, endIndex);
  }

  getAllPages(): number[] {
    let totalPages = Math.ceil(this.allNotifications.length / this.itemsPerPage);
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
    let totalPages = Math.ceil(this.allNotifications.length / this.itemsPerPage);

    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

}
