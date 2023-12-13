import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private tokenKey: string = 'access_token';
  private tokenRefreshKey: string = 'token_refresh';

  constructor() { }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getTokenRefresh(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenRefreshKey);
    }
    return null;
  }

  setTokenRefresh(tokenRefresh: string): void {
    localStorage.setItem(this.tokenRefreshKey, tokenRefresh);
  }

  remoteToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  remoteTokenRefresh(): void {
    localStorage.removeItem(this.tokenRefreshKey);
  }

  getEmail(): string | undefined {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      return decodedToken.sub;
    }
    return undefined;
  }
}
