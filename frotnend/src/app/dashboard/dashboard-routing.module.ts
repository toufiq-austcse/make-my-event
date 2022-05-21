import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
   // canActivate: [NoAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
