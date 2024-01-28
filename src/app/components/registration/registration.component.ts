import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  name: string = "";
  lastName: string = "";
  address: string = "";
  phoneNumber: string = "";
  username: string = "";
  password: string = "";
  message: string = "";

  constructor(private router:Router) {}

  ngOnInit(): void {}

  register(): void {
    // provera da su sva polja popunjena -> da li moraju da budu sva obavezna? Vrvt ne

    let allUsersString = localStorage.getItem('users');
    if(allUsersString == null) {
      return;
    }
    let allUsers: User[] = JSON.parse(allUsersString);

    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].username == this.username) {
        this.message = "Korisnicko ime vec postoji.";
        return;
      }
    }

    let newUser: User = {
      name: this.name,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      username: this.username,
      password: this.password,
      type: "kupac"
    };

    allUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(allUsers));
  }
}

// Videti za tip
