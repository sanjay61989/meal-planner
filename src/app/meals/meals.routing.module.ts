import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyTrackerComponent } from './daily-tracker/daily-tracker.component';
import { MainComponent } from './main/main.component';
import { MealListComponent } from './meal-list/meal-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'meallist',
        component: MealListComponent,
      },
      {
        path: 'tracker',
        component: DailyTrackerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}
