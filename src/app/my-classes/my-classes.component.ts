import { Component, OnInit,Inject } from '@angular/core';
import { MyClassGeneralInfo } from './my-class-general-info';
import { MyClassesService } from './my-classes.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JoinClass } from './join-class';
import { CreateClass } from './create-class';
import { NotificationDialogService } from './../shared/notification-dialog/notification-dialog.service';

export interface JoinClassDialogData {
  classCode: string;
}

export interface CreateClassDialogData {
  className: string;
}

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.scss']
})
export class MyClassesComponent implements OnInit {

  myClasses!: MyClassGeneralInfo[];
  className!: string;
  classCode!: string; 

  constructor(private myClassesServoce: MyClassesService, 
    private router: Router,
     public dialog: MatDialog,
     private notificationDialogService:NotificationDialogService) { }

  ngOnInit(): void {
    this.myClassesServoce.getMyClasses().subscribe((myClasses: MyClassGeneralInfo[]) => this.myClasses = myClasses);
  }

  openJoinClassDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {classCode: this.classCode},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.myClassesServoce.joinClass(result).subscribe((data: JoinClass) => {
          this.notificationDialogService.open({title: "თქვენ წარმატებით გაწევრიანდით კლასში!", content: "კლასის სახელი არის: " + data.className});
        });
      }
    });
  }

  openCreateClassDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog2, {
      data: {className: this.className},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.myClassesServoce.createClass(result).subscribe((data: CreateClass) => {
          this.myClassesServoce.getMyClasses().subscribe((myClasses: MyClassGeneralInfo[]) => this.myClasses = myClasses);
          this.notificationDialogService.open({title: "თქვენ წარმატებით შექმენით კლასი!", content: "კლასის კოდი არის: " + data.classCode });
        });
      }
    });
  }



  goToClass(classCode: string) {
    this.router.navigate(['class', classCode]);
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./my-classes.component.scss']
})
export class DialogOverviewExampleDialog implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: JoinClassDialogData,
  ) {}

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-example-dialog2',
  templateUrl: 'dialog-overview-example-dialog2.html',
  styleUrls: ['./my-classes.component.scss']
})
export class DialogOverviewExampleDialog2 implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CreateClassDialogData,
  ) {}

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

