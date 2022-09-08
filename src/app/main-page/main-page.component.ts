import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  currentUser: User;
  gameId!: string;
  starWars: boolean = false;

  constructor(public authService: AuthService,
    private router: Router,) {
    this.currentUser = authService.getCurrentUser();
  }

  ngOnInit(): void {
  }

  joinGame() {
    this.starWars = true;
    setTimeout(
      () => {
        this.router.navigate(['game', this.gameId]);
      }, 20000);
  }

}
