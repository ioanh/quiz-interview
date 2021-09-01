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

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(
      (data) => {
        console.log(data)
        this.questions = data.results
        console.log(this.questions)
        this.question = this.questions[0]
      }
    )
  }

}
