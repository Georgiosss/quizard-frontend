import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent {
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  goToGameRules() {
    this.router.navigate(['game-rules'], { relativeTo: this.route });
  }

  goToMainPage() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  goToAboutUs() {
    this.router.navigate(['about-us'], { relativeTo: this.route });
  }

  goToMyClasses() {
    this.router.navigate(['my-classes'], { relativeTo: this.route });
  }

  goToQuestionsManagement() {
    this.router.navigate(['questions-management'], { relativeTo: this.route });
  }

  goToProfile() {
    this.router.navigate(['profile'], { relativeTo: this.route });
  }

  goToContact() {
    this.router.navigate(['contact'], { relativeTo: this.route });
  }
}