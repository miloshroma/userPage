import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';

export interface Question {
    id?: string;
    title:string;
    text:string;
    togs: string[];
    date?:string;
    name?:string;
}

interface addQuestion {
    name:string;
}

@Injectable({providedIn: 'root'})

export class QuestionService{
    public date:BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

    click:number;

    static url = 'https://userpages-3fd35.firebaseio.com/';

    constructor(private http:HttpClient, private router:Router) {}
    
    showQuestion(question: Question): Observable<Question> {
        return this.http
        .post<any>(`${QuestionService.url}.json`,question)
        .pipe(map(res => {
            console.log(res);
            return {...question,id:res.name};
        }))
    }

    load():Observable<Question[]> {
        return this.http.get(`${QuestionService.url}/.json`)
        .pipe(map(question => {
            if(!question) {
                return [];
            }
            return Object.keys(question).map(key => ({...question[key],id:key}));
        })); 

    }
}