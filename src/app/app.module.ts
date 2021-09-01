import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './quiz/quizAPI.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
