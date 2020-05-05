import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { QuestionService } from '../question/questions.service';
import { element } from 'protractor';

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
  togs:string [] = ['tog1','tog2','tog3'];

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
    if(this.flag) {
      let sortedCompetedList = this.questions.sort((a,b) => {
        return a.date - b.date
      });
      this.questions = sortedCompetedList;
      this.flag = !this.flag
    }
    else if (!this.flag) {
      let arrDate = this.questions.sort((a,b) => b.date - a.date);
      this.questions = arrDate;
      this.flag = !this.flag
    }
  }

  completedFilter() {
    let newarr = this.questions.filter((item) => item.newComment.find((elem) => elem.checked == true));
    this.questions = newarr;
  }

  filterOfDay() {
    let arrDay = this.questions.filter((item) => {
      if(new Date(item.date).getDay() == new Date().getDay()) {
        return true;
      }
      return false;
    })
    this.questions = arrDay;
  }

  filterOfWeek() {
    let arrWeek = this.questions.filter((item) => {
      if(new Date().getTime() - item.date < 604800000) {
        return true;
      }
      return false;
    });
    this.questions = arrWeek;
  }

  filterOfMonth() {
    let arrMonth = this.questions.filter((item) => {
      if(new Date(item.date).getMonth() == new Date().getMonth()) {
        return true;
      }
      return false;
    });
    this.questions = arrMonth;
  }

  onChange(event){
    console.log(event)
    
  }
  // filterOfСategories() {
    
  // }
}
