import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar'


@NgModule({
  declarations: [
    EventComponent,
    MainComponent
  ],
  imports: [
    CommonModule,MatListModule,MatSidenavModule,DashboardRoutingModule,MatIconModule,MatToolbarModule
  ]
})
export class DashboardModule { }
