import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DailyTrackerComponent } from './daily-tracker/daily-tracker.component';
import { MainComponent } from './main/main.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealsRoutingModule } from './meals.routing.module';

@NgModule({
  declarations: [DailyTrackerComponent, MealListComponent, MainComponent],
  imports: [CommonModule, MealsRoutingModule],
  exports: [],
})
export class MealsModule {}
