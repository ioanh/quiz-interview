import { Component, OnInit } from '@angular/core';
import { QuizService } from './quizAPI.service';
import { Quiz } from './quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private quizService: QuizService) { }

  questions: Array<Quiz>;
  question: Quiz;
  progress: number;

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(
      (data) => {
        console.log(data)
        this.questions = data.results
        console.log(this.questions)
        this.question = this.questions[0]
        this.progress = 10;
      }
    )
  }


  previousQ(){
    const pQ = this.questions.indexOf(this.question) - 1
    this.question = this.questions[pQ]
  }

  nextQ(){
    const nQ = this.questions.indexOf(this.question) + 1
    this.question = this.questions[nQ]
  }

}
