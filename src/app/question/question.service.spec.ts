import { TestBed, inject } from '@angular/core/testing';
import { QuestionService } from './questions.service';
import {HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';


describe('QuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionService],
      imports:[HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireDatabaseModule,],
    });
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
});