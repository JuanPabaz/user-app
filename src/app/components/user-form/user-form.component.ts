import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms' 
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  user: User = new User();

  constructor(private sharing_data_service: SharingDataService){
    this.user = new User();
  }

  onSubmit(userForm: NgForm){
    if (userForm.valid){
      this.sharing_data_service.newUserEventEmitter.emit(this.user);
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

}
