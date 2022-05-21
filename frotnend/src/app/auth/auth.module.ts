import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'


@NgModule({
  imports: [ReactiveFormsModule,MatFormFieldModule,MatOptionModule,MatSelectModule,MatInputModule,MatButtonModule,MatCardModule, CommonModule, AuthRoutingModule],
  declarations: [SigninComponent, SignupComponent],
})
export class AuthModule {}
