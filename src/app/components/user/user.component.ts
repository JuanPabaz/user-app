import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  users: User[] = [];
  paginator: any = {};
  url: string = '/users/page'

  constructor(
    private route: ActivatedRoute,
    private sharing_data_service: SharingDataService,
    private user_service: UserService,
    private auth_service: AuthService,
    private router: Router){
    if (this.router.getCurrentNavigation()?.extras.state){
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length === 0){
      console.log("Consulta find all")
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        
        this.user_service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as User[];
          this.paginator = pageable;
          this.sharing_data_service.paginatorEventEmitter.emit({paginator: this.paginator});
        });
      })
    }
  }

  onRemoveUser(id: number){
    this.sharing_data_service.idUserEventEmitter.emit(id);
  }

  onEditUser(user: User){
    this.router.navigate(['/edit-user/', user.id]);
  }

  getAdmin(){
    return this.auth_service.isAdmin();
  }
}
