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
  numberOfCat:boolean[] = [false,false,false];
  checkedValue:boolean = false;
  layout:boolean = false;
  admin:boolean;
  colorInvert:boolean = false || this.questionService.colorApp;
  approve:boolean = true;
  moderationOn: boolean = false;
  myQuestion: boolean = false;
  name:string;

  constructor(private authSevice:AuthService,
    private questionService:QuestionService) { }


  ngOnInit(): void {
    this.authSevice.getLoggerInUser()
    .subscribe(user => {
      this.user = user;
      this.authSevice.addAdmin(this.user.email).subscribe((admins) => {
        this.admin = admins;
        this.authSevice.isAdmin = admins;
      });
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
    //this.numberOfCat = + event.source.id.split('').reverse()[0];
    //this.numberOfCat.push(+ event.source.id.split('').reverse()[0]);
    let number = + event.source.id.split('').reverse()[0];
    this.numberOfCat.splice(number-1,1,true);
    console.log( this.numberOfCat);
  }
  timeFilterValue(event) {
    this.timeValue = event.value;
  }
  addClasses() {
    this.layout = !this.layout
  }
  invertColor() {
    this.colorInvert = !this.colorInvert;
    this.questionService.colorApp = this.colorInvert;
  }
  moderationFilter() {
    this.moderationOn = !this.moderationOn;
  }
  myQuestionFilter() {
    this.myQuestion = !this.myQuestion;
    this.name = this.user.email;
  }
}
