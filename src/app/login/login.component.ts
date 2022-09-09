import { Component, OnInit } from '@angular/core';
import { NotificationDialogService } from '../shared/notification-dialog/notification-dialog.service';
import { User } from '../shared/user';
import { AuthService } from './../shared/auth.service';

interface Role {
  value: string;
  viewValue: string;
}

interface loginRequest {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  hideSecond = true;
  role: string = 'მოსწავლე';
  roles: Role[] = [
    {value: 'STUDENT', viewValue: 'მოსწავლე'},
    {value: 'TEACHER', viewValue: 'მასწავლებელი'},
  ];
  loginEmail = '';
  loginPassword = '';
  registrationUserName = '';
  registrationPassword = '';
  registrationEmail = '';
  constructor(public authService: AuthService,
    public notificaitonService: NotificationDialogService) { 
    
  }

  ngOnInit(): void {
  }

  signUp() {
    console.log("hahaha");
    let user: User = new User();
    user.email = this.registrationEmail;
    user.fullName = this.registrationUserName;
    user.password = this.registrationPassword;
    user.roles = [this.role];
    this.authService.signUp(user).subscribe((res) => {
      this.notificaitonService.open({title: "თქვენ წარმატებით გაიარეთ რეგისტრაცია!", content: "არ დაგავიწყდეს: ცოდნა, შრომა, თავისუფლება!"});
    });
  }

  signIn() {
    let user: User = new User();
    user.email = this.loginEmail;
    user.password = this.loginPassword;
    this.authService.signIn(user);
  }

}
