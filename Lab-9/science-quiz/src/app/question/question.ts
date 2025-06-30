import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { QuestionService } from '../question-service';

@Component({
  standalone: true,
  selector: 'app-question',
  imports: [CommonModule, RouterModule],
  templateUrl: './question.html',
  styleUrls: ['./question.css']
})
export class Question {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private questionService = inject(QuestionService);

  questionIndex = 0;
  question: any;
  feedback = '';
  hasAnswered = false;
  wasCorrect = false;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.questionIndex = Number(params.get('id'));
      this.question = this.questionService.getQuestions()[this.questionIndex];
      this.feedback = ''; 
      this.hasAnswered = false;
      this.wasCorrect = false;
    });
  }

  select(option: string) {
    if (this.hasAnswered) return;

    this.hasAnswered = true;
    const isCorrect = option === this.question.correctAnswer;
    this.wasCorrect = isCorrect;
    this.feedback = isCorrect ? '✅ Correcto' : '❌ Incorrecto';
  }

  next() {
    //Si no respondio o la respuesta es incorrecta
     this.questionService.registerResult(this.wasCorrect && this.hasAnswered);

    const nextIndex = this.questionIndex + 1;
    if (nextIndex < this.questionService.getQuestions().length) {
      this.router.navigate(['/question', nextIndex]);
    } else {
      this.router.navigate(['/results']);
    }
  }
}