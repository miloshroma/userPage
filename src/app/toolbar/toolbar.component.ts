import { Component, OnInit, Input, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { QuestionService } from '../question/questions.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  click:boolean =  true || this.questionService.isShow;
  user:firebase.User;
  isShowLogin:Boolean = true;
  isShowSignUp:Boolean = true;
  colorInvert:boolean = this.questionService.colorApp;

  constructor(private authService: AuthService,
    private router: Router,
    private questionService:QuestionService) { }

  ngOnInit(): void {
    this.authService.getLoggerInUser()
    .subscribe(user => {
      this.user = user;
    });
  }

  logOut() {
    this.authService.logout();
  }

  isShowAddQuestion() {
    this.click = !this.click;
  }

  showFormLogin() {
    this.isShowSignUp = !this.isShowSignUp;
  }
  showFormSignUp() {
    this.isShowLogin = !this.isShowLogin;
  }
  
}
