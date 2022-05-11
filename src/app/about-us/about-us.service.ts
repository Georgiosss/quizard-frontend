import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { AboutUs } from './about-us';

@Injectable({
  providedIn: 'root',
})

export class AboutUsService {
  endpoint: string = config.apiUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getAboutUsInfo(): Observable<any> {
    let url = `${this.endpoint}/about-us/get-info`;
    return this.http.get<AboutUs>(url);
  }

}
