import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { Rule } from './rule';

@Injectable({
  providedIn: 'root'
})
export class GameRulesService {
  endpoint: string = config.apiUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getRules(): Observable<any> {
    let url = `${this.endpoint}/game-rules/get-rules`;
    return this.http.get<Rule[]>(url);
  }
}
