import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ItemDetailsComponent implements OnInit {

  itemToShow!: Item;

  constructor(private router:Router) {}

  ngOnInit(): void {
    let itemToShowString = localStorage.getItem('itemToShow');
    if(itemToShowString != null) {
      this.itemToShow = JSON.parse(itemToShowString);
    }
  }
}
