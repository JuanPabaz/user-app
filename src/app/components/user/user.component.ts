import { Component } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[] = [];
}
