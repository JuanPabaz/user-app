import { Component, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user',
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[] = [];

  constructor(
    private sharing_data_service: SharingDataService,
    private user_service: UserService,
    private router: Router){
    if (this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }else{
      this.user_service.findAllUsers().subscribe(users => {
        this.users = users;
      });
    }
  }

  onRemoveUser(id: number){
    this.sharing_data_service.idUserEventEmitter.emit(id);
  }

  onEditUser(user: User){
    this.sharing_data_service.selectedUserEventEmitter.emit(user)
  }
}
