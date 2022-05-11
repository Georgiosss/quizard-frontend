import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root',
})

export class ContactService {
  endpoint: string = config.apiUrl;

  constructor(private http: HttpClient, public router: Router) {}

  getContactInfo(): Observable<any> {
    let url = `${this.endpoint}/contact/get-info`;
    return this.http.get<Contact>(url);
  }

}
