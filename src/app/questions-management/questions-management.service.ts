import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QuestionsManagementService {
  endpoint: string = config.apiUrl;
  constructor(private http: HttpClient, public router: Router) { }


  addQuestions(form: any): Observable<any> {
    let url = `${this.endpoint}/questions-management/add-questions`;
    console.log("vashli");
    return this.http.post<string>(url, form);
  }
}
