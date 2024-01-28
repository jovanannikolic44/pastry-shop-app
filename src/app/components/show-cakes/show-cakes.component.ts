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
  allCakes: Item[] = [];

  constructor(private router:Router) {}

  ngOnInit(): void {
    let allCakesString = localStorage.getItem('cakes');
    
    if(allCakesString == null) {
      return;
    }

    this.allCakes = JSON.parse(allCakesString);
  }
}
