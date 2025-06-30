import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuestionService } from '../question-service';

@Component({
  standalone: true,
  selector: 'app-results',
  imports: [RouterModule],
  templateUrl: './results.html',
})
export class ResultsComponent {
  private questionService = inject(QuestionService);

  score = this.questionService.getScore();
  total = this.questionService.getTotal();
}