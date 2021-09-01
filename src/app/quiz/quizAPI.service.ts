import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

@Injectable()
export class QuizService {
    constructor (private httpClient: HttpClient) {}
    getQuestions(): Observable<any>{
        return this.httpClient.get('http://opentdb.com/api.php?amount=10&category=18')
    }

}