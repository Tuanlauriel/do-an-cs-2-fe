import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JobField} from "../interfaces/job_field";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobFieldService {
  private apiUrl = 'http://localhost:8080/api/v1/job-fields';

  constructor(private http: HttpClient) { }

  getJobFieldAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  postJobField(jobField: JobField): Observable<any> {
    return this.http.post(this.apiUrl, jobField);
  }

  deleteJobField(id: number): Observable<any> {
    const API = `${this.apiUrl}/${id}`;
    return this.http.delete(API);
  }
}
