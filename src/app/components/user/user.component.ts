import { Component, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[] = [];

  idUserEventEmitter = new EventEmitter()

  selectedUserEventEmitter = new EventEmitter()

  constructor(private router: Router){
    this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
  }

  onRemoveUser(id: number){
    this.idUserEventEmitter.emit(id);
  }

  onEditUser(user: User){
    this.selectedUserEventEmitter.emit(user)
  }
}
