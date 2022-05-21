import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { DashboardModule } from './dashboard/dashboard.module';
import {MatIconModule} from '@angular/material/icon'
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatOptionModule,
    AuthModule,
    DashboardModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
