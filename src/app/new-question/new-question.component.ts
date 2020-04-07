import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  form:FormGroup;
  
  togs:string [] = ['tog1','tog2','tog3'];
  selectedTogsValue = [];
  togsError:boolean = true;

  constructor(private formBuilder: FormBuilder) { }


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

    if(this.form.valid && !this.togsError){
      console.log(this.form.value);
    }
    
    // console.log(this.form.get('tog2').value);
    // console.log(this.form.get('tog3').value);

  }

}
