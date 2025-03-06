import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms' 
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  user: User;

  constructor(
    private user_service: UserService,
    private route: ActivatedRoute,
    private sharing_data_service: SharingDataService){
      this.user = new User();
  }

  ngOnInit(): void {
    // this.sharing_data_service.selectUserByIdEventEmitter.subscribe(user => {
    //   this.user = user;
    // })

    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');

      if (id > 0){
        // this.sharing_data_service.findUserByIdEventEmitter.emit(id);
        this.user_service.findUserById(id).subscribe(user => {
          this.user = user;
        });
      }
    });
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
