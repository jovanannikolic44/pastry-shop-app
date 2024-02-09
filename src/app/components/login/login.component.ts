import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { Promotion } from '../../models/Promotion';
import { Item } from '../../models/Item';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  message: string = "";

  constructor(private router:Router) {}

  ngOnInit(): void {
    this.initializeUsers();
    this.initializePromotions();
    this.initializeItems();
  }

  logIn(): void {
    if(this.username == "" || this.password == "" || this.username == null || this.password == null) {
      this.message = "Popute sva prazna polja.";
      return;
    }

    let allUsersString = localStorage.getItem('users');
    let allUsers = allUsersString? JSON.parse(allUsersString) : [];

    if(allUsers.length == 0) {
      return;
    }
    
    let loggedInUser = null;

    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].username == this.username && allUsers[i].password == this.password) {
        loggedInUser = allUsers[i];
        this.message = "";
        break;
      }
    }

    if(loggedInUser == null) {
      this.message = "Pogresni kredencijali.";
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    if(loggedInUser.type == "kupac") {
      this.router.navigate(['/show-items']);
    }
    else if(loggedInUser.type == "zaposleni") {
      this.router.navigate(['/staff-requests']);
    }
  }

  private initializeUsers(): void {
    let allUsersString = localStorage.getItem('users');
    
    if(allUsersString == null) {
      let users: User[] = [
        {name: "Ana", lastName: "Marinkovic", phoneNumber:"0678899334", address: "Adresa 1", username: "ana", password: "ana123", type: "kupac"},
        {name: "Milos", lastName: "Markovic", phoneNumber:"0678899339", address: "Adresa 2", username: "milos", password: "milos123", type: "kupac"},
        {name: "Nenad", lastName: "Novakovic", phoneNumber:"0678899332", address: "Adresa 3", username: "nenad", password: "nenad123", type: "zaposleni"}
      ];
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  private initializePromotions(): void {
    let allPromotionsString = localStorage.getItem('promotions');
    let allPromotions = allPromotionsString? JSON.parse(allPromotionsString) : [];
    
    if(allPromotions.length == 0) {
      let promotions: Promotion[] = [
        {id: "1", name: "UZ TORTU, I KOLAC", description: "Uz kupljenu tortu na dva ili vise spratova dobija se gratis jedan kolac po izboru.", imageUrl: "../../../assets/promotion1.jpeg"},
        {id: "2", name: "POVOLJNIJE ZA MLADENCE", description: "Tokom ovog meseca traje popust za narucene mladenacke torte.", imageUrl: "../../../assets/promotion2.png"},
        {id: "3", name: "KO NE VOLI COKOLADNE KOLACE?", description: "Kupovinom cokoladnih kolaca, dobijate duplo!", imageUrl: "../../../assets/promotion3.jpg"}
      ];
      localStorage.setItem('promotions', JSON.stringify(promotions));
    }
  }

  private initializeItems(): void {
    let allCakesString = localStorage.getItem('cakes');
    let allCakes = allCakesString? JSON.parse(allCakesString) : [];
    
    if(allCakes.length == 0) {
      let cakes: Item[] = [
        {id: "1", name: "COKOLADNA TORTA", description: "Torta napravljena od najfinije cokolade.", price: "2000", composition: ["3 jaja", "6 kasika secera", "3 kasike ulja", "3 kasike mleka", "3 kasike kakaoa", "3 kasike brasna", "1/2 praska za pecivo"], type: "torta", imageUrl: "../../../assets/chocolate-cake.webp"},
        {id: "2", name: "VOCNA TORTA", description: "Osvezavajuca torta od raznolikog sezonskog voca.", price: "3000", composition: ["5 belanaca", "220g secera", "600ml slatke pavlake", "400g svezeg sezonskog voca", "1 kasika scera u prahu", "50gr badema"], type: "torta", imageUrl: "../../../assets/fruit-cake.jpg"},
        {id: "3", name: "TORTA SA JAGODAMA", description: "Osvezavajuca torta sa jagodama i pudingom.", price: "3000", composition: ["200gr keksa", "100ml mlevenih badema i lesnika", "100gr maslaca", "300ml slatke pavlake", "300ml pavlake za kuvanje", "150gr secera u prahu", "10gr zelatina u prahu", "3 kasike soka od limuna", "500gr jagoda"], type: "torta", imageUrl: "../../../assets/strawberries-cake.jpg"},
        {id: "4", name: "TORTA OD COKOLADICA", description: "Specijalna cokoladna torta sa vasim omiljenim cokoladicama.", price: "3000", composition: ["cokoladice po zelji"], type: "torta", imageUrl: "../../../assets/cake-with-chocolate.jpg"},
        {id: "5", name: "BOMBA", description: "Neponovljiva torta koja je izdrzala test vremena.", price: "4000", composition: ["250gr maslaca", "300g mlevenog keksa", "200gr oraha", "6 jaja", "150ml soka od breskve", "200g secera", "12 kasika secera", "6 kasika secera za karamel"], type: "torta", imageUrl: "../../../assets/bomba-cake.jpeg"},
        {id: "6", name: "REFORMA", description: "Kraljica medju tortama - najlepsa cokoladna torta", price: "4000", composition: ["12 jaja", "320g secera", "320g oraha", "100gr cokolade", "250gr maslaca"], type: "torta", imageUrl: "../../../assets/reforma-cake.jpg"},
      ];
      localStorage.setItem('cakes', JSON.stringify(cakes));
    }

    let allCookiesString = localStorage.getItem('cookies');
    let allCookies = allCookiesString? JSON.parse(allCookiesString) : [];
    
    if(allCookies.length == 0) {
      let cookies: Item[] = [
        {id: "7", name: "BROWNIES", description: "Kolaci sa punim ukusom cokolade.", price: "400", composition: ["100gr margarina", "400gr cokolade", "4 jaja", "140gr secera", "150gr brasna", "150gr oraha", "1 kasicica cimeta"], type: "kolac", imageUrl: "../../../assets/promotion3.jpg"},
        {id: "8", name: "COOKIES", description: "Hrskavi kolacici sa mrvicama cokolade.", price: "250", composition: ["85gr maslaca", "1 jaje", "85gr secera", "1 kesica vanilinog secera", "150gr brasna", "100g cokolade", "1 kasicica soli", "1 kasicica praska za pecivo"], type: "kolac", imageUrl: "../../../assets/cookies.jpg"},
        {id: "9", name: "BAJADERA", description: "Jedan od najstarijih kolaca, ali i dalje nezamenljiv.", price: "500", composition: ["650gr secera", "18 kasika vode", "210gr margarina", "250gr mlevenih oraha", "250gr mlevenog keksa", "100gr cokolade", "100gr cokolade za kuvanje", "20gr margarina", "3 kasike mleka", "3 kasike ulja"], type: "kolac", imageUrl: "../../../assets/bajadera.jpg"},
        {id: "10", name: "RAFAELO KUGLICE", description: "Sjajni ukus kokosa.", price: "500", composition: ["200g vode", "500g secera", "500g mleka u prahu", "250g margarina", "400g kokosa", "100g lesnika"], type: "kolac", imageUrl: "../../../assets/rafaelo-kuglice.webp"},
        {id: "11", name: "MILKA KOCKE", description: "Lagan kolac sa lesnikom i Milka cokoladom.", price: "400", composition: ["7 jaja", "200g secera", "2 kasike ulja", "100g mlevenog lesnika", "1 kasika brasna", "5g praska za pecivo", "800ml mleka", "120g gustina", "10g vanilin secera", "250g maslaca", "160g mlecne Milka cokolade", "100g bele Milka cokolade", "200ml slatke pavlake", "1 kasika kisele pavlake"], type: "kolac", imageUrl: "../../../assets/milka-kocke.jpg"},
        {id: "12",name: "TRILECE", description: "Kolac koji morate da probate!", price: "350", composition: ["6 jaja", "100gr secera", "200gr brasna", "1/2 praska za pecivo", "1 vanilin secer", "400ml slatke pavlake", "300ml kondenzovanog mleka", "800ml mleka", "300gr karamel krema"], type: "kolac", imageUrl: "../../../assets/trilece.jpg"},
      ];
      localStorage.setItem('cookies', JSON.stringify(cookies));
    }

    localStorage.setItem('itemId', "13");
  }
}
