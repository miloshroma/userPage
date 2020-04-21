import { Component, OnInit } from '@angular/core';
import { QuestionService, Comment, Question } from '../questions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-full-question',
  templateUrl: './full-question.component.html',
  styleUrls: ['./full-question.component.scss']
})
export class FullQuestionComponent implements OnInit {

  question:any;
  index:any;
  form:FormGroup;
  user:firebase.User;
  commentQuestion:any;
  arrayOfComment: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private questionService:QuestionService,
    private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
    this.questionService.findQuestion()
    .then(question => {
      this.question = question;
    });
    this.form = this.formBuilder.group({
      comments: ['', [
        Validators.required
      ]],
    });
  }
  
  addComment(){
    console.log(this.form.get('comments').value,this.afAuth.auth.currentUser.email,'id:',this.question.id)
   this.arrayOfComment.push({comment:this.form.get('comments').value,userName:this.afAuth.auth.currentUser.email});
    this.questionService.updateCustomer(this.question.id,
      {newComment:this.arrayOfComment})
      .catch(err => console.log(err));
  }
}
