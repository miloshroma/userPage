import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { QuestionService } from '../question/questions.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user:firebase.User;
  questions:Object[];
  togs:boolean[];

  constructor(private authSevice:AuthService,
    private questionService:QuestionService) { }


  ngOnInit(): void {
    this.authSevice.getLoggerInUser()
    .subscribe(user => {
      this.user = user;
    });

    this.questionService.load().subscribe(question => {
     this.questions = question;
     console.log(this.questions)
    },err => console.error(err));

  }
  questionNumber(index){
    this.questionService.click = index;
    console.log(index);
  }

  sortOfDate() {
    // let sortedCompetedList = this.questions.sort((a,b) => Date.parse(a.date.split('-').reverse().join('-')) - Date.parse(b.date.split('-').reverse().join('-')));
    // let arrDate = this.questions.sort((a,b) => Date.parse(b.date.split('-').reverse().join('-')) - Date.parse(a.date.split('-').reverse().join('-')));
    // console.log(sortedCompetedList,arrDate);
    // this.questions = arrDate; -- you can decomment this. It's work, but have a troubles
  }
}
