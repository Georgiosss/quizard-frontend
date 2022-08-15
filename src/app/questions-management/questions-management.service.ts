import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { AddQuestionsResponse } from './add-questions-response';
import { importQuestionsResponse } from './import-questions-response';
import { Questions } from './questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsManagementService {
  
  endpoint: string = config.apiUrl;
  constructor(private http: HttpClient, public router: Router) { }


  addQuestions(form: any): Observable<any> {
    let url = `${this.endpoint}/questions-management/add-questions`;
    return this.http.put<AddQuestionsResponse>(url, form);
  }

  addQuestionsToQuestionsPack(form: FormData) {
    let url = `${this.endpoint}/questions-management/add-questions-to-questions-pack`;
    return this.http.post<AddQuestionsResponse>(url, form);
  }

  importQuestions(questionsCode: string): Observable<any> {
    let url = `${this.endpoint}/questions-management/import-questions`;
    return this.http.post<importQuestionsResponse>(url, questionsCode);
  }

  getQuestions(): Observable<any> {
    let url = `${this.endpoint}/questions-management/get-all-questions`;
    return this.http.get<Questions>(url);
  } 
}
