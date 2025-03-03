import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms' 
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  user: User = new User();

  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(){
    this.user = new User();
  }

  onSubmit(){
    this.newUserEventEmitter.emit(this.user)
    console.log(this.user);
  }

}
