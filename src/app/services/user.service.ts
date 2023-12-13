import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private user?: User;

  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor() { }

  getUser(email: string): Observable<any> {
    const API = `${this.apiUrl}/${email}`;
    return this.http.get(API);
  }

  postUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

}
