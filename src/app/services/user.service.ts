import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private user?: User;

  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private localStorageService: LocalStorageService) { }

  getUserByEmail(email: string): Observable<any> {
    const API = `${this.apiUrl}/${email}`;
    return this.http.get(API);
  }

  postUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  loadUser(): void {
    const email = this.localStorageService.getEmail();
    if (email && (!this.user || this.user?.email !== email)) {
      this.getUserByEmail(email).subscribe(response => this.user = response.data);
    }
  }

  getUser(): User | undefined {
    return this.user;
  }
 
}
