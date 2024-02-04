import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';

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
}
