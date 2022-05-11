import { Component, OnInit,Inject } from '@angular/core';
import { MyClassGeneralInfo } from './my-class-general-info';
import { MyClassesService } from './my-classes.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
     public dialog: MatDialog) { }

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
        this.myClassesServoce.joinClass(result).subscribe((data: string) => {
          console.log(data);
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
        this.myClassesServoce.createClass(result).subscribe((data: string) => {
          console.log(data);
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

