import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  findAllUsers(): Observable<User[]>{
    // return of(this.users);
    return this.http.get<User[]>(this.baseUrl);
  }

  findUserById(id: number): Observable<User>{
    // return of(this.users);
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user: any): Observable<User>{
    return this.http.post<User>(this.baseUrl, user);
  }
  
  updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void>{
    // return of(this.users);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
