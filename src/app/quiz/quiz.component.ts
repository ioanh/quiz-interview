import { Component, OnInit } from '@angular/core';
import { QuizService } from './quizAPI.service';
import { Quiz } from './quiz.model';
import { interval, Subscription } from 'rxjs';

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
  source = interval(60000);
  progressTimer = interval(1000);
  questionNumber: number;
  subscriptionToSource: Subscription;
  gamePlaying: boolean; 

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(
      (data) => {
        this.questions = data.results
        this.question = this.questions[0]
        this.progress = 61;
        this.questionNumber = 0;

        this.subscriptionToSource = this.source.subscribe((val) => {
          this.question = this.questions[val + 1]
          this.progress = 61;
        })

        this.progressTimer.subscribe(val => this.progress -= 1)
      }
    )

  }

  nextQ(){
    this.questionNumber += 1;
    this.question = this.questions[this.questionNumber]
    this.progress = 61;

    this.subscriptionToSource.unsubscribe();

    this.subscriptionToSource = this.source.subscribe((val) => {
      this.question = this.questions[this.questionNumber += 1]
      this.progress = 61;
    })
  }

}
