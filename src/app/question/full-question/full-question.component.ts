import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../questions.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

function User(comment, name, date) {
  this.comment = comment;
  this.name = name; 
  this.date = date;
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
  checked:boolean;
  element:any
  trueComment:boolean;

  constructor(private formBuilder: FormBuilder,
    private questionService:QuestionService,
    private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
    this.questionService.findQuestion()
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
  }
  
  addComment(){
    this.arrayOfComment.push(new User(this.form.get('comments').value,this.afAuth.auth.currentUser.email,this.questionService.date.value.format('DD-MM-YYYY')));
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
    console.log(event.source.name,event.checked);
   // this.checked = event.checked;
    //this.checked = !this.checked

    let number = event.source.name.split('').reverse()[0];
   
    this.questionService.updateTrueComment(this.question.id,number,{checked:event.checked});
    this.question.newComment.forEach((elem,i) => {
      if(i == number) {
        this.trueComment = elem.checked
      }
      
    })
    console.log(this.trueComment)
  }

}
