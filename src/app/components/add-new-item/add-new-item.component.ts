import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrl: './add-new-item.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AddNewItemComponent implements OnInit {
  itemId: number = 1;

  choosenImage: string = "";
  name: string = "";
  description: string = "";
  price: string = "";
  composition: string = "";
  showCakesOrCookies: string = "";
  message: string = "";

  predefinedCakesImages: string[] = [];
  predefinedCookiesImages: string[] = [];

  constructor() {}

  // izabere tip koji dodaje -> cakes -> show predefined cakes
  // izabere cookies -> show predefined cookies 

  ngOnInit(): void {
    // predefined images
    this.predefinedCakesImages = [
      "../../../assets/predefinedCake1.jpg",
      "../../../assets/predefinedCake2.jpg",
      "../../../assets/predefinedCake3.jpg",
      "../../../assets/predefinedCake4.jpg"
    ];

    this.predefinedCookiesImages = [
      "../../../assets/predefinedCookie1.jpg",
      "../../../assets/predefinedCookie2.jpeg",
      "../../../assets/predefinedCookie3.jpg",
      "../../../assets/predefinedCookie4.jpeg"
    ];

    let itemIdString = localStorage.getItem('itemId');
    this.itemId = itemIdString ? parseInt(itemIdString) : 1;
  }

  saveClickedImage(image: string): void {
    this.choosenImage = image;
  }

  add(): void {
    if(this.showCakesOrCookies == "cakes") {

      let indexToRemove = this.predefinedCakesImages.indexOf(this.choosenImage);
      if(indexToRemove > -1) {
        this.predefinedCakesImages.splice(indexToRemove, 1);
      }

      let allCakesString = localStorage.getItem('cakes');
      let allCakes = allCakesString? JSON.parse(allCakesString) : [];

      let newItem: Item = {
        id: this.itemId.toString(),
        name: this.name,
        description: this.description,
        price: this.price,
        composition: this.composition.split(','),
        type: 'torta',
        imageUrl: this.choosenImage
      };

      allCakes.push(newItem);
      localStorage.setItem('cakes', JSON.stringify(allCakes));

      this.itemId++;
      localStorage.setItem('itemId', this.itemId.toString());
    }
    else {
      let indexToRemove = this.predefinedCookiesImages.indexOf(this.choosenImage);
      if(indexToRemove > -1) {
        this.predefinedCookiesImages.splice(indexToRemove, 1);
      }

      let allCookiesString = localStorage.getItem('cookies');
      let allCookies = allCookiesString? JSON.parse(allCookiesString) : [];

      let newItem: Item = {
        id: this.itemId.toString(),
        name: this.name,
        description: this.description,
        price: this.price,
        composition: this.composition.split(','),
        type: 'kolac',
        imageUrl: this.choosenImage
      };

      allCookies.push(newItem);
      localStorage.setItem('cookies', JSON.stringify(allCookies));

      this.itemId++;
      localStorage.setItem('itemId', this.itemId.toString());
    }

    this.message = "Dodavanje novog proizvoda je uspesno."
  }
}
