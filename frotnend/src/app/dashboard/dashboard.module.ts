import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatToolbarModule} from '@angular/material/toolbar';
import { CreateEventComponent } from './create-event/create-event.component';
import { ListEventComponent } from './list-event/list-event.component'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MainComponent,
    CreateEventComponent,
    ListEventComponent
  ],
  imports: [
    CommonModule,MatListModule,MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatSidenavModule,DashboardRoutingModule,MatIconModule,MatToolbarModule
  ]
})
export class DashboardModule { }
