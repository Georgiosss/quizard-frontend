import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InputDialogService } from '../shared/input-dialog/input-dialog.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { NotificationDialogService } from './../shared/notification-dialog/notification-dialog.service';
import { QuestionsManagementService } from './questions-management.service';
import { from } from 'rxjs';
import { importQuestionsResponse } from './import-questions-response';
import { AddQuestionsResponse } from './add-questions-response';
import { Router } from '@angular/router';
import { Questions } from './questions';

@Component({
  selector: 'app-questions-management',
  templateUrl: './questions-management.component.html',
  styleUrls: ['./questions-management.component.scss']
})
export class QuestionsManagementComponent implements OnInit {


  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;
  questionsName!: any;
  myQuestions!: Questions[];

  constructor(
    public inputDialogService: InputDialogService, 
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private notificationDialogService: NotificationDialogService,
    private questionsManagementService: QuestionsManagementService,
    private router: Router,) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });

    this.questionsManagementService.getQuestions().subscribe((myQuestions: Questions[]) => this.myQuestions = myQuestions);
  }
  onFileSelect(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!_.includes(af, file.type)) {
        this.notificationDialogService.open({title: "ფაილის ფორმატი ექსელი არ არის!", content: "გთხოვთ შეიყვანოთ ექსელის ფორმატის ფაილი"});
      } else {
        this.fileInputLabel = file.name;
        let form = this.fileUploadForm.get('myfile');
        if (form !== null) {
          form.setValue(file);
        } 
      }
    }
  }


  onFormSubmit() {
    let form = this.fileUploadForm.get('myfile');
    console.log(form);
    if (form !== null && !form.value) {
      this.notificationDialogService.open({title: "შეცდომა!", content: "გთხოვ აირჩიოთ ფაილი!"});
      return false;
    }

    const formData = new FormData();
    if (form !== null) {
      formData.append('file', form.value);
      formData.append('questionsName', this.questionsName);
    }

    if (form !== null) {
      this.questionsManagementService.addQuestions(formData).subscribe((data: AddQuestionsResponse) => {
        this.notificationDialogService.open({title: "თქვენ წარმატებით ატვირთეთ კითხვები!", content: 'კითხვების კოდი: ' + data.questionsCode});
      });
    }  
    return true;
  }

  importQuestions() {
    this.inputDialogService.open({
      title: "კითხვების იმპორტი",
      content: "შეიყვანეთ კოდი",
      inputLabel: "კითხვების კოდი",
      okButton: "კითხვების დამატება",
      input: ""
    }).afterClosed().subscribe((result: string) => {
      this.questionsManagementService.importQuestions(result).subscribe((data: importQuestionsResponse) => {
        this.notificationDialogService.open({title: 'თქვენ წარმატებით დააიმპორტეთ კითხვები!', content: 'კითხვების სახელი: ' + data.questionsName});
      });

    });;
  }

  goToQuestions(questionsCode: string) {
    this.router.navigate(['questions-editor', questionsCode]);
  }

}
