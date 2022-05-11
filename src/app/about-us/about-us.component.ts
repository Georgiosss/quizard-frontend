import { Component, OnInit } from '@angular/core';
import { AboutUs } from './about-us';
import { AboutUsService } from './about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUs!: AboutUs;

  constructor(private aboutUsService: AboutUsService) {
    
  }

  ngOnInit(): void {
    this.aboutUsService.getAboutUsInfo().subscribe((data: AboutUs) => this.aboutUs = data);
  }

}
