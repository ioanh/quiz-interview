import { Component, OnInit } from '@angular/core';
import { QuizService } from './quizAPI.service';
import { Quiz } from './quiz.model';
import { interval } from 'rxjs';

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
  source = interval(10000);
  progressTimer = interval(1000)

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(
      (data) => {
        this.questions = data.results
        this.question = this.questions[0]
        this.progress = 100;

        this.source.subscribe((val) => {
          this.question = this.questions[val + 1]
          this.progress = 110;
        })

        this.progressTimer.subscribe(val => this.progress -= 10)
      }
    )

  }

  nextQ(){
    const nQ = this.questions.indexOf(this.question) + 1
    this.question = this.questions[nQ]
    this.progress += 10;
    setTimeout(this.nextQ, 3000);
  }

}
