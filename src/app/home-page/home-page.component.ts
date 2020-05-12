import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { QuestionService } from '../question/questions.service';
import { togs } from '../constants'

export interface ShortQuestion {
  id?: string;
  title:string;
  text:string;
  togs: string[];
  date:number;
  name?:string;
  newComment?:Array<any>
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user:firebase.User;
  questions:Array<ShortQuestion>;
  flag:boolean = false;
  togsValue = togs;
  day:boolean = false;
  completed: boolean = false;
  timeValue:string;
  numberOfCat:number;
  checkedValue:boolean = false;
  layout:boolean = false;

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

  sortOfDate() {
    this.questions.sort((a, b) => this.flag ? a.date - b.date : b.date - a.date);
    this.flag = !this.flag;
  }

  completedFilter() {
    this.completed = !this.completed;
  }

  onChange(event){
    this.checkedValue = event.checked;
    this.numberOfCat = + event.source.id.split('').reverse()[0];
  }
  timeFilterValue(event) {
    this.timeValue = event.value;
  }
  addClasses() {
    this.layout = !this.layout
  }
}
