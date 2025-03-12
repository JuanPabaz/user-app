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
    if (this._user.isAuth){
      return this._user;
    }else if (sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user') || '{}');
      return this._user;
    }
    return this._user;
  }

  set token(token: string){
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token(){
    if (this._token){
      return this._token;
    }else if (sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token!;
  }

  getPayload(token:string){
    if (token != null){
      const payload = JSON.parse(atob(token.split(".")[1]))
      payload.authorities = JSON.parse(payload.authorities);
      return payload;
    }
    return null;
  }

}
