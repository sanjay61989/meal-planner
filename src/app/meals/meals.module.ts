import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyTrackerComponent } from './daily-tracker/daily-tracker.component';
import { MealListComponent } from './meal-list/meal-list.component';

const routes: Routes = [
  {
    path: '',
    component: MealListComponent,
  },
  {
    path: 'tracker',
    component: DailyTrackerComponent,
  },
];

@NgModule({
  declarations: [DailyTrackerComponent, MealListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MealsModule {}
