import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  message: string = "";
  editField: boolean = false;
  loggedUser!: User;

  constructor() {}

  ngOnInit(): void {
    let loggedUserString = localStorage.getItem("loggedInUser");
    if(loggedUserString != null) {
      this.loggedUser = JSON.parse(loggedUserString);
    }
  }

  edit(): void {
    this.editField = true;
  }

  save(): void {
    this.editField = false;

    let allUsersString = localStorage.getItem('users');
    if(allUsersString != null) {
      let allUsers: User[] = JSON.parse(allUsersString);

      for(let i = 0; i < allUsers.length; i++) {
        if(this.loggedUser.username == allUsers[i].username) {
          allUsers[i].name = this.loggedUser.name;
          allUsers[i].lastName = this.loggedUser.lastName;
          allUsers[i].address = this.loggedUser.address;
          allUsers[i].phoneNumber = this.loggedUser.phoneNumber;
          allUsers[i].password = this.loggedUser.password;
          break;
        }
      }

      localStorage.setItem('users', JSON.stringify(allUsers));
    }

  }

  cancel(): void {
    this.editField = false;
  }

}
