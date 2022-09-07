import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile!: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
      this.profileService.getProfile().subscribe((data: Profile) => {
        this.profile = data;
      });
  }

  edit() {

  }

}
