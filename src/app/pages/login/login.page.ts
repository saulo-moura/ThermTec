import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public usersService : UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().then((data) => {
      console.log(data);
    })
  }

  ionViewDidLoad() {

  }

}
