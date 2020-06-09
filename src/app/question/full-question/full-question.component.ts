import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../questions.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


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
  arrayOfComment: any[] = [] || this.question.newComment;
  error:string;
  checked:boolean = false;
  element:any
  trueComment:boolean;
  admin:boolean;
  colorInherit:boolean;


  constructor(private formBuilder: FormBuilder,
    private questionService:QuestionService,
    private afAuth:AngularFireAuth,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.questionService.findQuestion(id)
      .then(question => {
        this.question = question;
      });
      this.form = this.formBuilder.group({
        comments: ['', [
          Validators.required
        ]],
      });
    });
    this.admin = this.authService.isAdmin;
    this.colorInherit = this.questionService.colorApp;
  }
  
  addComment(){
    let user = {
      comment:this.form.get('comments').value,
      name: this.afAuth.auth.currentUser.email,
      date: this.questionService.date.getTime(),
      checked:this.checked,
    }
    if(this.question.newComment === undefined) {
      this.question.newComment = [];
    }
    this.question.newComment.push(user);

    this.questionService.updateCustomer(this.question.id,this.question.newComment)
      .catch(err => this.error = err);

      this.form.get('comments').setValue(' ');
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

  onChange(event, comment) {
    let number = event.source.name.split('').reverse()[0];
   
    this.questionService.updateTrueComment(this.question.id,number,{checked:event.checked});
    comment.checked = event.checked;
  }

  toApprove(){
    this.question.approve = !this.question.approve
    this.questionService.updateApproveState(this.question.id,{approve:this.question.approve});
  }

  deleteQuestion(){
    this.questionService.deleteCustomer(this.question.id).then((success) => {
      console.log('You have been successfully logged in!')
        this.router.navigateByUrl('');
    });
  }
}