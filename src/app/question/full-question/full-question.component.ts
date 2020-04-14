import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../questions.service';

@Component({
  selector: 'app-full-question',
  templateUrl: './full-question.component.html',
  styleUrls: ['./full-question.component.scss']
})
export class FullQuestionComponent implements OnInit {

  questions:Object[];
  index:number;

  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {
    this.questionService.load().subscribe(question => {
      this.questions = question;
     // console.log('---->',this.questions);  
     },err => console.error(err));
 
  }

  show() {
    this.index = this.questionService.click;
    return this.index;
  }

}
