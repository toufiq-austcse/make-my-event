import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { ListEventComponent } from './list-event/list-event.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      {
        path: 'event/create',
        component: CreateEventComponent,
      },
      {
        path: 'event/list',
        component: ListEventComponent,
      },
    ],
    // canActivate: [NoAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
