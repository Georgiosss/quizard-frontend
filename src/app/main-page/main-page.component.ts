import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  currentUser: User;

  constructor(public authService: AuthService) {
    this.currentUser = authService.getCurrentUser();
  }

  ngOnInit(): void {
  }

}
