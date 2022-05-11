import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { MyClassGeneralInfo } from './my-class-general-info'; 

@Injectable({
  providedIn: 'root',
})

export class MyClassesService {
  endpoint: string = config.apiUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getMyClasses(): Observable<any> {
    let url = `${this.endpoint}/my-classes/get-classes`;
    return this.http.get<MyClassGeneralInfo[]>(url);
  }

}
