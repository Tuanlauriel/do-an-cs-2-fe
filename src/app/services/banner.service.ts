import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from '../interfaces/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private apiUrl = 'http://localhost:8080/api/v1/banners';

  constructor(private http: HttpClient) { }

  getAllBanner(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  postBanner(image: File, link: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('link', link);

    return this.http.post(this.apiUrl, formData);
  }

  putBanner(banner: Banner): Observable<any> {
    const API = `${this.apiUrl}/${banner.id}`;
    return this.http.put(API, banner);
  }

  deleteBanner(id: number): Observable<any> {
    const API = `${this.apiUrl}/${id}`
    return this.http.delete(API);
  }

}
