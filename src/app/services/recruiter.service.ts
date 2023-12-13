import { Injectable, inject } from '@angular/core';
import { Company } from '../interfaces/company';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private http: HttpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/v1/recruiters';

  constructor() { }

  postRecruiter(user: User, company: Company): Observable<any> {
    const data = { 'userRequest': user, "companyRequest": company };
    console.log(data);
    return this.http.post(this.apiUrl, data);
  }

}
