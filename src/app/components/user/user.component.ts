import { Component, EventEmitter, OnInit } from '@angular/core';
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
export class UserComponent implements OnInit{

  users: User[] = [];

  constructor(
    private sharing_data_service: SharingDataService,
    private user_service: UserService,
    private router: Router){
    if (this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
    }
  }

  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length === 0){
      console.log("Consulta find all")
      this.user_service.findAllUsers().subscribe(users => {
        this.users = users;
      });
    }
  }

  onRemoveUser(id: number){
    this.sharing_data_service.idUserEventEmitter.emit(id);
  }

  onEditUser(user: User){
    this.router.navigate(['/edit-user/', user.id]);
  }
}
