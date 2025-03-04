import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-app',
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit{
  users: User[] = [];
  selectedUser: User = new User();
  showForm: boolean = false;

  constructor(private user_service: UserService){

  }

  ngOnInit(): void {
    this.user_service.findAllUsers().subscribe(users => 
      this.users = users
    );
  }

  addUser(user: User){
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
    this.selectedUser = new User();
    Swal.fire({
      title: "Guardado!",
      icon: "success",
      draggable: true
    });
  }

  removeUser(id: number){
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
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  setUser(user: User){
    this.selectedUser = {...user};
    this.showForm = true;
  }

  setShowForm(){
    this.showForm = !this.showForm;
    this.selectedUser = new User();
  }
}
