import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'meals', pathMatch: 'full' },
  // Redirect to meals module by default
  {
    path: 'meals',
    loadChildren: () =>
      import('./meals/meals.module').then((m) => m.MealsModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
