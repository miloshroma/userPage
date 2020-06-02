import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

export interface Question {
    id?: string;
    title:string;
    text:string;
    togs: string[];
    date:number;
    name?:string;
    approve:boolean;
}

export interface Comment {
    comment?:string;
    userComment?:string;
}


@Injectable({providedIn: 'root'})


export class QuestionService{

    private dbPath = '/questions';
 
    public date:Date = new Date();

    question:Question;
    isShow:boolean = true;
    id:string;
    editQuestion:any;
    colorApp:boolean = false;

    static url = 'https://userpages-3fd35.firebaseio.com/questions';
    static urlName = 'https://userpages-3fd35.firebaseio.com/admins';

    questionRef: AngularFireList<Question> = null;

    constructor(private http:HttpClient, private router:Router,
        private db:AngularFireDatabase) {
            this.questionRef = db.list(this.dbPath);
        }
    updateCustomer(key: string, value: any): Promise<void> {
        return this.questionRef.update(key, value);
    }
    updateTrueComment(id:string, number:number,value: any){
        return this.db.list(`/questions/${id}/newComment/`).update(number.toString(),value);
    }
    updateApproveState(key:any,value: any){
        return this.db.list(`/questions/`).update(key,value);
    }
    showQuestion(question: Question): Observable<Question> {
        return this.http
        .post<any>(`${QuestionService.url}.json`,question)
        .pipe(map(res => {
            console.log('res',res);
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

    findQuestion(idQuestion) {
        return this.http.get(`${QuestionService.url}/.json`)
        .pipe(map(question => {
            if(!question) {
                return [];
            }
            return Object.keys(question).map(key => ({...question[key],id:key})).find(element => element.id == idQuestion);
        })).toPromise()
        .then(result => {
            console.log('From Promise:', result);
            return result;
        });
    }
    addAdmin(): Observable<any> {
        return this.http
        .get<any>(`${QuestionService.urlName}.json`)
        .pipe(map(res => {
            console.log('res',res);
            return res;
        }))
    }
}