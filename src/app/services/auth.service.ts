import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private apiUrl = 'http://localhost:8080/api/v1/auth';

  constructor() { }

  login(user: User): Observable<any> {
    const API = `${this.apiUrl}/login`;
    return this.http.post(API, user);
  }

  refreshToken(tokenRefresh: string): Observable<any> {
    const API = `${this.apiUrl}/refresh`;
    return this.http.post(API, { tokenRefresh: tokenRefresh });
  }

  logout(): void {
    if (this.isLoggedIn()) {
      this.localStorageService.remoteToken();
      this.localStorageService.remoteTokenRefresh();
    }
  }

  isLoggedIn(): boolean {
    if (this.localStorageService.getToken()) {
      return true;
    }
    return false;
  }

  getRole(): any {
    let token = this.localStorageService.getToken();
    if (token) {
      const decode = jwtDecode<JwtPayload>(token);
      return decode.role;
    }
    return undefined;
  }

}
