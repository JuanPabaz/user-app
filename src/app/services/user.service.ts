import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id:1,
      name: 'Juan Pablo',
      lastName: 'Giraldo',
      email: 'jpgthf@gmail.com',
      username: 'juanpablo24',
      password: 'coco123'
    },
    {
      id:2,
      name: 'Manuela',
      lastName: 'Zapata',
      email: 'manu@gmail.com',
      username: 'manu1',
      password: 'manu123'
    },
    {
      id:3,
      name: 'Jeronimo',
      lastName: 'Arango',
      email: 'jero@gmail.com',
      username: 'jero1',
      password: 'jero123'
    },
    {
      id:4,
      name: 'Carolina',
      lastName: 'Hernandez',
      email: 'caro@gmail.com',
      username: 'psicologa1',
      password: 'psicologa123'
    }
  ]

  constructor() { }

  findAllUsers(): Observable<User[]>{
    return of(this.users);
  }
}
