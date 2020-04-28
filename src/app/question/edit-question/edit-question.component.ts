import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { QuestionService } from '../questions.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  form:FormGroup;
  clickToShow:boolean = true;
  error:string;
  
  togs:string [] = ['tog1','tog2','tog3'];
  selectedTogsValue = [];
  togsError:boolean = true;

  constructor(private formBuilder: FormBuilder,
    private questionService:QuestionService,
    private router:Router,
    private afAuth:AngularFireAuth) { }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      title: [this.questionService.editQuestion.title,[
         Validators.required
      ]],
      text: [this.questionService.editQuestion.text, [
        Validators.required
      ]],
      allTogs:this.addTogsControls(),
    });  
      
  }

  addTogsControls() {
    const arr = this.questionService.editQuestion.togs.map((element) => {
  
      return this.formBuilder.control(element);
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

  editQuestion() {
    this.questionService.updateCustomer(this.questionService.editQuestion.id,{title:this.form.get('title').value,text:this.form.get('text').value,togs:this.form.get('allTogs').value})
    .then(success => {
      this.router.navigateByUrl('');
    })
    .catch(error => this.error = error);
  }
}
