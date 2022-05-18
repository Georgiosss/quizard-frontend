import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InputDialogService } from '../shared/input-dialog/input-dialog.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { NotificationDialogService } from './../shared/notification-dialog/notification-dialog.service';
import { QuestionsManagementService } from './questions-management.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-questions-management',
  templateUrl: './questions-management.component.html',
  styleUrls: ['./questions-management.component.scss']
})
export class QuestionsManagementComponent implements OnInit {


  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;
  foo!: string;

  constructor(
    public inputDialogService: InputDialogService, 
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private notificationDialogService: NotificationDialogService,
    private questionsManagementService: QuestionsManagementService) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }
  onFileSelect(event: any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

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
      this.notificationDialogService.open({title: "გთხოვთ შეიყვანოთ ვალიდური მონაცემები!", content: "მოწოდებული მონაცემები არასწორია"});
      return false;
    }

    const formData = new FormData();
    if (form !== null) {
      formData.append('file', form.value);
    }

    if (form !== null) {
      this.questionsManagementService.addQuestions(formData).subscribe((data: string) => this.foo = data);
    }  
    // this.http
    //   .post<any>('http://www.example.com/api/upload', formData).subscribe(response => {
    //     console.log(response);
    //     if (response.statusCode === 200) {
    //       this.uploadFileInput.nativeElement.value = "";
    //       this.fileInputLabel = '';
    //     }
    //   }, error => {
    //     console.log(error);
    //   });
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
      console.log(result);
      return result;
    });;
  }

}
