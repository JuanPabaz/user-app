import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { error } from 'console';

@Component({
  selector: 'app-user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit{
  users: User[] = [];
  paginator: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharing_data_service: SharingDataService,
    private user_service: UserService){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const page = +(params.get('page') || '0');
      
      this.user_service.findAllPageable(page).subscribe(pageable => 
        this.users = pageable.content as User[]
      );
    })
    this.addUser();
    this.removeUser();
    this.findUserById();
    this.paganitorEvent();
  }

  paganitorEvent(){
    this.sharing_data_service.paginatorEventEmitter.subscribe(paginator => {
      this.paginator = paginator;
    })
  }

  findUserById(){
    this.sharing_data_service.findUserByIdEventEmitter.subscribe(id => {
      const userById = this.users.find(user => 
        user.id === id
      )
      this.sharing_data_service.selectUserByIdEventEmitter.emit(userById);
    })
  }

  addUser(){
    this.sharing_data_service.newUserEventEmitter.subscribe(user => {
      if (user.id > 0){
        this.user_service.updateUser(user).subscribe(
          {
            next: (updatedUser) => {
              this.users = this.users.map(u =>{
              if (u.id === updatedUser.id){
                return {...updatedUser};
              }
              return u;
              });
              this.router.navigate(['/users'], {state: {users: this.users}});
            },
            error: (err) => {
              if (err.status === 400){
                this.sharing_data_service.errorsUserFormEventEmitter.emit(err.error);
              }
            }
          }
        );
      }else{
        const userRequest = {
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          username:user.username,
          password: user.password
        }
        this.user_service.createUser(userRequest).subscribe(
          {
            next: (newUser) => {
              this.users = [...this.users,{...newUser}];
              this.router.navigate(['/users'], {state: {users: this.users}});
              Swal.fire({
                title: "Guardado!",
                icon: "success",
                draggable: true
              });
            },
            error: (err) => {
              if (err.status === 400){
                this.sharing_data_service.errorsUserFormEventEmitter.emit(err.error);
              }
            } 
          }
        )
      }
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
          this.user_service.deleteUser(id).subscribe(() => {
            this.users = this.users.filter(user => user.id != id);
            this.router.navigate(['/create-user'], {skipLocationChange:true}).then(() => {
              this.router.navigate(['/users'],{state: {users: this.users}});
            })
          });
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
