import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { Question } from './question/question';
import { ResultsComponent } from './results/results';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'question/:id', component: Question },
  { path: 'results', component: ResultsComponent },
];