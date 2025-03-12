import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/login';
  private _token: string | undefined;
  private _user: any = {
    isAuth: false,
    isAdim: false,
    user: undefined
  };


  constructor(private http: HttpClient) { }

  login(username:string, password:string):Observable<any>{
    return this.http.post<any>(this.baseUrl, {username, password});
  }

  set user(user: any){
    this._user = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  get user(){
    return this._user;
  }

  set token(token: string){
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token(){
    return this._token!;
  }

}
