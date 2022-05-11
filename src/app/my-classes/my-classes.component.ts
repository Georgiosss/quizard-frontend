import { Component, OnInit } from '@angular/core';
import { MyClassGeneralInfo } from './my-class-general-info';
import { MyClassesService } from './my-classes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.scss']
})
export class MyClassesComponent implements OnInit {

  myClasses!: MyClassGeneralInfo[];

  constructor(private myClassesServoce: MyClassesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.myClassesServoce.getMyClasses().subscribe((myClasses: MyClassGeneralInfo[]) => this.myClasses = myClasses);
  }

  goToClass(classCode: string) {
    this.router.navigate(['class', classCode]);
  }

}
