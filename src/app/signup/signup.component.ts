import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../shared/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './../shared/user'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private http: HttpClient
  ) {
    this.signupForm = this.fb.group({
      email: [''],
      password: [''],
      fullName: [''],
      role: [''],
    });
  }

  ngOnInit() {}

  registerUser() {
    let request: User = new User();
    request.email = this.signupForm.controls['email'].value;
    request.password = this.signupForm.controls['password'].value;
    request.fullName =  this.signupForm.controls['fullName'].value;
    request.roles = [this.signupForm.controls['role'].value];
    this.authService.signUp(request).subscribe((res) => {
      console.log("asdoasbd")
      console.log(res)
      if (res.message) {
        console.log("shemovedi")
        this.signupForm.reset();
        this.router.navigate(['log-in']);
      }
    });
  }
}
