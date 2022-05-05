import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
   
  }



  login() {
    this.authService.login(
      {
        username: 'test',
        password: 'test'
      }
    )
    .subscribe(success => {
      if (success) {
        this.router.navigate(['/secret-random-number']);
      }
    });
  }

}
