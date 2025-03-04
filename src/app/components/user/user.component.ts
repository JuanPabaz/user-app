import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input() users: User[] = [];

  @Output() idUserEventEmitter = new EventEmitter()

  @Output() selectedUserEventEmitter = new EventEmitter()

  onRemoveUser(id: number){
    const confirmRemove = confirm('¿Esta seguro que desea eliminar?');
    if (confirmRemove){
      this.idUserEventEmitter.emit(id);
    }
  }

  onEditUser(user: User){
    this.selectedUserEventEmitter.emit(user)
  }
}
