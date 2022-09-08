import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateGameService } from './create-game.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { MyClassesService } from '../my-classes/my-classes.service';
import { MyClassGeneralInfo } from '../my-classes/my-class-general-info';
import { MyClassService } from '../my-class/my-class.service';
import { ClassMember } from '../my-class/class-member';

interface ClassNode {
  name: string;
  children?: ClassNode[];
  id?: number;
}

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  treeControl = new NestedTreeControl<ClassNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ClassNode>();
  userIds: number[] = [];
  content: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public questionsCode: any,
  public createGameService: CreateGameService,
  public myClassesService: MyClassesService,
  public myClassService: MyClassService) {
    
   }

  ngOnInit(): void {
    const myData: ClassNode[] = [];
    this.myClassesService.getMyClasses().subscribe((data: MyClassGeneralInfo[]) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.myClassService.getClass(data[i].classCode).subscribe((students: ClassMember[]) => {
          const myStudents: ClassNode[] = [];
          for (let i = 0; i < students.length; i++) {
            console.log(students[i]);
            myStudents.push({name: students[i].fullName, id: students[i].id});
          }
          myData.push({name: data[i].className, children: myStudents});
          if (myData.length == data.length) {
            this.dataSource.data = myData;
            console.log(myData);
          }
        });
      }
    });
  }

  check(id: number) {
    let flag: boolean = true;
    for (let i = 0; i < this.userIds.length; i++) {
      if (this.userIds[i] === id) {
        flag = false;
        const index = this.userIds.indexOf(id, 0);
        if (index > -1) {
          this.userIds.splice(index, 1);
        }
        break;
      }
    }
    if (flag) {
      this.userIds.push(id);
    }
    console.log(this.userIds);
  }

  createGame() {
      this.createGameService.createGame({questionPackCode: this.questionsCode.value, userIds: this.userIds}).subscribe((data: any) => {
        this.content = data.toString();
      });
  }

  hasChild = (_: number, node: ClassNode) => !!node.children && node.children.length > 0;



}
