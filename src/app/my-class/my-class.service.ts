import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { ClassMember } from './class-member';

@Injectable({
  providedIn: 'root',
})

export class MyClassService {
  endpoint: string = config.apiUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getClass(classCode: string | null): Observable<any> {
    let url = `${this.endpoint}/my-classes/class/` + classCode;
    return this.http.get<ClassMember[]>(url);
  }

}
