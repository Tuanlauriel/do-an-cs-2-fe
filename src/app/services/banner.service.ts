import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = 'http://localhost:8080/api/v1/banners';

  constructor(private http: HttpClient) { }

  postBanner(image: File, link: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('link', link);

    return this.http.post(this.apiUrl, formData);
  }
}
