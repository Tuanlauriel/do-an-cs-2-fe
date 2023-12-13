import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private http: HttpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/v1/upload';

  constructor() { }

  uploadFile(file: File, targetDir: string): Observable<any> {
    const API = `${this.apiUrl}/${targetDir}`;
    const formData = new FormData();
    formData.append(targetDir, file);
    return this.http.post(API, formData);
  }
}
