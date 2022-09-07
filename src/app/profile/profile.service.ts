import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  endpoint: string = config.apiUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getProfile(): Observable<any> {
    let url = `${this.endpoint}/profile/get-profile`;
    return this.http.get<Profile>(url);
  }
}
