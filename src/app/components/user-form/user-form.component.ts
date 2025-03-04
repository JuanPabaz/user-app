import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms' 
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() user: User = new User();

  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  @Output() showFormEventEmitter: EventEmitter<User> = new EventEmitter();

  constructor(){
    this.user = new User();
  }

  onSubmit(userForm: NgForm){
    if (userForm.valid){
      this.newUserEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
    console.log(this.user);
  }

  onClear(userForm: NgForm){
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

  onShowForm(){
    this.showFormEventEmitter.emit();
  }

}
