import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit{
  users: User[] = [];

  constructor(
    private router: Router,
    private sharing_data_service: SharingDataService,
    private user_service: UserService){

  }

  ngOnInit(): void {
    this.user_service.findAllUsers().subscribe(users => 
      this.users = users
    );
    this.addUser();
    this.removeUser();
  }

  addUser(){
    this.sharing_data_service.newUserEventEmitter.subscribe(user => {
      if (user.id > 0){
        this.users = this.users.map(u =>{
          if (u.id === user.id){
            return {...user};
          }
          return u;
        }
        )
      }else{
        this.users = [...this.users,{...user, id: new Date().getTime()}];
      }
      this.router.navigate(['/users'],{state: {users: this.users}});
      Swal.fire({
        title: "Guardado!",
        icon: "success",
        draggable: true
      });
    })
  }

  removeUser(){
    this.sharing_data_service.idUserEventEmitter.subscribe(id => {
      Swal.fire({
        title: "¿Estas seguro de eliminar el usuario?",
        text: "Esta acción no se podrá revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => 
            user.id !== id
          )
          this.router.navigate(['/create-user'], {skipLocationChange:true}).then(() => {
            this.router.navigate(['/users'],{state: {users: this.users}});
          })
          Swal.fire({
            title: "Eliminado!",
            text: "El usuario ha sido eliminado.",
            icon: "success"
          });
        }
      });
    })
  }

}
