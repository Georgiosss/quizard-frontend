import { Component, OnInit } from '@angular/core';
import { ClassMember } from './class-member';

@Component({
  selector: 'app-my-class',
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.scss']
})
export class MyClassComponent implements OnInit {

  members!: ClassMember[]; 

  constructor() { }

  ngOnInit(): void {
  }

  goToProfile(id: number) {
    console.log(id);
  }

}
