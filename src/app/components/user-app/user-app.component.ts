import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-app',
  imports: [UserComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit{
  users: User[] = [];

  constructor(private user_service: UserService){

  }

  ngOnInit(): void {
    this.user_service.findAllUsers().subscribe(users => 
      this.users = users
    );
  }
}
