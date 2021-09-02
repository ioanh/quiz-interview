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

  //Declaring the variables
  questions: Array<Quiz>;
  question: Quiz;
  progress: number;
  source = interval(60000);
  progressTimer = interval(1000);
  questionNumber: number;
  subscriptionToSource: Subscription;
  gamePlaying: boolean; 
  slideAni = false;

  ngOnInit(): void {
    //Getting the questions from the API service
    this.quizService.getQuestions().subscribe(
      (data) => {
        this.questions = data.results
        this.question = this.questions[0]
        this.progress = 61;
        this.questionNumber = 0;
        this.gamePlaying = true;
        //Subscribing to the 60sec counter for the auto question switch
        this.subscriptionToSource = this.source.subscribe((val) => {
          if(this.questionNumber < 9){
            this.question = this.questions[val + 1]
            this.progress = 61;
            this.gamePlaying = true;
          }else {
            this.gamePlaying = false;
          }
        })
        //Counting 1s and decreasing the timer with each 1s
        this.progressTimer.subscribe(val => this.progress -= 1)
      }
    )
  }

  //Clicking an answer
  nextQ(){
    this.slideAni = true;
    //If not the end of the questions
    if(this.questionNumber < 9){
      this.questionNumber += 1;
      this.question = this.questions[this.questionNumber]
      this.progress = 61;
  
      this.subscriptionToSource.unsubscribe();
  
      this.subscriptionToSource = this.source.subscribe((val) => {
        this.question = this.questions[this.questionNumber += 1]
        this.progress = 61;
      })

      this.gamePlaying = true;
    }else{
      this.gamePlaying = false;
    }
    setTimeout(() => {this.slideAni = false}, 2000)

  }

}
