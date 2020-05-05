import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../questions.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Route } from '@angular/compiler/src/core';
import { Params, ActivatedRoute } from '@angular/router';

function User(comment, name, date, checked) {
  this.comment = comment;
  this.name = name; 
  this.date = date;
  this.checked = checked;
}

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
  error:string;
  checked:boolean = false;
  element:any
  trueComment:boolean;

  constructor(private formBuilder: FormBuilder,
    private questionService:QuestionService,
    private afAuth:AngularFireAuth,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.questionService.findQuestion(id)
      .then(question => {
        this.question = question;
        if(question?.newComment) {
          this.arrayOfComment = question?.newComment;
        }
      });
      this.form = this.formBuilder.group({
        comments: ['', [
          Validators.required
        ]],
      });
    });
  }
  
  addComment(){
    this.arrayOfComment.push(new User(this.form.get('comments').value,this.afAuth.auth.currentUser.email,this.questionService.date.getTime(),this.checked));
    this.questionService.updateCustomer(this.question.id,{newComment:this.arrayOfComment})
      .catch(err => this.error = err);
  }
  showCheckbox() {
    if (this.question?.name === this.afAuth.auth.currentUser?.email) {
      return true;
    }
    return false;
  }

  editInformation() {
    this.questionService.editQuestion = this.question;
  }

  onChange(event) {
    let number = event.source.name.split('').reverse()[0];
   
    this.questionService.updateTrueComment(this.question.id,number,{checked:event.checked});
    this.question.newComment.forEach((elem,i) => {
      if(i == number) {
        this.trueComment = elem.checked
      }
      
    });
  }

}
