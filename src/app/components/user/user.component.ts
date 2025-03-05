import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input() users: User[] = [];

  @Output() idUserEventEmitter = new EventEmitter()

  @Output() selectedUserEventEmitter = new EventEmitter()

  onRemoveUser(id: number){
    this.idUserEventEmitter.emit(id);
  }

  onEditUser(user: User){
    this.selectedUserEventEmitter.emit(user)
  }
}
