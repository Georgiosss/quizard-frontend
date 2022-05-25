import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsEditorService } from './questions-editor.service';
import { Question } from './question';

@Component({
  selector: 'app-questions-editor',
  templateUrl: './questions-editor.component.html',
  styleUrls: ['./questions-editor.component.scss']
})
export class QuestionsEditorComponent implements OnInit {

  questions!: Question[]; 

  constructor(private questionsEditorService: QuestionsEditorService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let questionsCode = this.actRoute.snapshot.paramMap.get('questionsCode');
    this.questionsEditorService.getQuestions(questionsCode).subscribe((questions: Question[]) => this.questions = questions);
  }

}
