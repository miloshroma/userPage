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
  numberOfCat:number[] = [];
  layout:boolean = false;
  admin:boolean;
  colorInvert:boolean = this.questionService.colorApp || false;
  approve:boolean = true;
  moderationOn: boolean = false;
  myQuestion: boolean = false;
  name:string;
  result:number[] = [];
  constructor(private authSevice:AuthService,
    private questionService:QuestionService) { }


  ngOnInit(): void {
    this.authSevice.getLoggerInUser()
    .subscribe(user => {
      this.user = user;
      this.authSevice.addAdmin(this.user?.email).subscribe((admins) => {
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

    let number = + event.source.id.split('').reverse()[0];
    this.numberOfCat.push(number);
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    this.numberOfCat.forEach(item => {
      if(item === 1) {
        count1++;
      }
      if(item === 2){
        count2++;
      }
      if(item === 3){
        count3++;
      }
    });
    this.result = this.numberOfCat.filter((item, i) => {
     
      if(count1 % 2 === 0 && count1 !== 0 && item === 1){
        return false;
      }
      if(count2 % 2 === 0 && count2 !== 0 && item === 2){
        return false;
      }
      if(count3 % 2 === 0 && count3 !== 0 && item === 3){
        return false;
      }
      return true;
    });
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
    if(this.colorInvert) {
      document.body.style.background = '#333'
    }
    if(!this.colorInvert){
      document.body.style.background = '#fff'
    }
  }
  moderationFilter() {
    this.moderationOn = !this.moderationOn;
  }
  myQuestionFilter() {
    this.myQuestion = !this.myQuestion;
  }

}
