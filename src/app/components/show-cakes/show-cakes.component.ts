import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Item } from '../../models/Item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-cakes',
  templateUrl: './show-cakes.component.html',
  styleUrl: './show-cakes.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ShowCakesComponent implements OnInit {
  allItems: Item[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private router:Router) {}

  ngOnInit(): void {
    let cookiesOrCakes = localStorage.getItem('cookiesOrCakes');
    if(cookiesOrCakes != null) {
      let allItemsString = localStorage.getItem(cookiesOrCakes);
      if(allItemsString != null) {
        this.allItems = JSON.parse(allItemsString);
      }
    }
  }

  get showItemsOnThePage(): Item[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allItems.slice(startIndex, endIndex);
  }

  getAllPages(): number[] {
    let totalPages = Math.ceil(this.allItems.length / this.itemsPerPage);
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
    let totalPages = Math.ceil(this.allItems.length / this.itemsPerPage);

    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  showDetails(selectedItem: Item): void {
    localStorage.setItem('itemToShow', JSON.stringify(selectedItem));
    this.router.navigate(['/item-details']);
  }
}
