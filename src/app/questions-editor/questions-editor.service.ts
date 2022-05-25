import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { Question } from './question';
@Injectable({
  providedIn: 'root'
})
export class QuestionsEditorService {

  endpoint: string = config.apiUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getQuestions(questionsCode: string | null): Observable<any> {
    let url = `${this.endpoint}/questions-management/get-questions-by-code/` + questionsCode;
    return this.http.get<Question[]>(url);
  }
}
