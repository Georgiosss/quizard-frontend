import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassMember } from './class-member';
import { MyClassService } from './my-class.service';

@Component({
  selector: 'app-my-class',
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.scss']
})
export class MyClassComponent implements OnInit {

  members!: ClassMember[]; 

  constructor(private myClassService: MyClassService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let classCode = this.actRoute.snapshot.paramMap.get('classCode');
    this.myClassService.getClass(classCode).subscribe((members: ClassMember[]) => this.members = members);
  }

  goToProfile(id: number) {
    console.log(id);
  }

}
