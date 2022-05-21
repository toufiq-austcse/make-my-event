import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';




const routes: Routes = [
  {
    path: 'sign-in',
    component: SigninComponent,
   // canActivate: [NoAuthGuard]
  },
  {
    path: 'sign-up',
    component: SignupComponent,
   // canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
