import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormArray } from '@angular/forms';
import { QuestionService, Question } from '../questions.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  form:FormGroup;
  clickToShow:boolean = true;
  
 togs:string [] = ['tog1','tog2','tog3'];
  selectedTogsValue = [];
  togsError:boolean = true;

  constructor(private formBuilder: FormBuilder,
    private questionService:QuestionService,
    private router:Router,
    private afAuth:AngularFireAuth) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({

      title: ['',[
         Validators.required
      ]],
      text: ['', [
        Validators.required
      ]],
      allTogs:this.addTogsControls(),
    });  
      
  }

  addTogsControls() {
    const arr = this.togs.map((element) => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }

  get togsArray() {
    return <FormArray>this.form.get('allTogs');
  }

  getselectedTogsValue() {
    this.selectedTogsValue = [];
    this.togsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedTogsValue.push(this.togs[i]);
      }
    });
   this.togsError = this.selectedTogsValue.length > 0 ? false : true;
  }

  checkedtogsTouches(){
    let flag = false;
    this.togsArray.controls.forEach((control) => {
      if (control.touched) {
        flag = true;
      }
    });
    return flag;
  }

  addQuestion() {
    const question:Question = {
      title: this.form.get('title').value,
      text: this.form.get('text').value,
      togs:this.form.get('allTogs').value,
      date: this.questionService.date.getTime(),
      name: this.afAuth.auth.currentUser.email,
    }
    if(this.form.valid && !this.togsError){
        this.questionService.showQuestion(question)
      .subscribe(question => {
        this.router.navigateByUrl('');
      },err => console.error(err));
    }
  }
  closeNewQuestion() {
    this.questionService.isShow = true;
  }

}
