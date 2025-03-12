import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }

  login(username:string, password:string):Observable<any>{
    return this.http.post<any>(this.baseUrl, {username, password});
  }


}
