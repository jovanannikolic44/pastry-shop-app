import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderRequest } from '../../models/OrderRequest';

@Component({
  selector: 'app-staff-requests',
  templateUrl: './staff-requests.component.html',
  styleUrl: './staff-requests.component.css',
  encapsulation: ViewEncapsulation.None
})
export class StaffRequestsComponent implements OnInit {
  allRequests: OrderRequest[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor() {}

  ngOnInit(): void {
    let allRequestsString = localStorage.getItem("waitingRequests");

    if(allRequestsString != null) {
      this.allRequests = JSON.parse(allRequestsString);
    }
  }

  get showRequestsOnThePage(): OrderRequest[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allRequests.slice(startIndex, endIndex);
  }

  getAllPages(): number[] {
    let totalPages = Math.ceil(this.allRequests.length / this.itemsPerPage);
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
    let totalPages = Math.ceil(this.allRequests.length / this.itemsPerPage);

    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  accept(request: OrderRequest): void {
    request.acceptance = "accepted";
    let indexToRemove = this.allRequests.indexOf(request);
    if(indexToRemove > -1) {
      this.allRequests.splice(indexToRemove, 1);
      localStorage.setItem("waitingRequests", JSON.stringify(this.allRequests));
    }
  }

  decline(request: OrderRequest): void {
    request.acceptance = "declined";
    let indexToRemove = this.allRequests.indexOf(request);
    if(indexToRemove > -1) {
      this.allRequests.splice(indexToRemove, 1);
      localStorage.setItem("waitingRequests", JSON.stringify(this.allRequests));
    }
  }
}
