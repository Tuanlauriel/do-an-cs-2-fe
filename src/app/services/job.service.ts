import { Injectable } from '@angular/core';
import {Job} from "../interfaces/job";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/v1/jobs';

  constructor(private http: HttpClient) { }

  postJob(job: Job): Observable<any> {
    return this.http.post(this.apiUrl, job);
  }
}
