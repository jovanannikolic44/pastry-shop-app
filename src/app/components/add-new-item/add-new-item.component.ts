import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
    console.log(image)
  }

  add(): void {

    this.itemId++;
    localStorage.setItem('itemId', this.itemId.toString());
  }
}
