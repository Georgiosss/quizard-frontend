import { Component, OnInit } from '@angular/core';
import { InputDialogService } from '../shared/input-dialog/input-dialog.service';

@Component({
  selector: 'app-questions-management',
  templateUrl: './questions-management.component.html',
  styleUrls: ['./questions-management.component.scss']
})
export class QuestionsManagementComponent implements OnInit {

  constructor(public inputDialogService: InputDialogService) { }

  ngOnInit(): void {
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
