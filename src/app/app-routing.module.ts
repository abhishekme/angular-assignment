import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { AuthGuard } from './service/guard/auth.guard.service';
import { AuthCheck } from './service/guard/auth.check.service';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,canActivate: [AuthCheck]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,canActivate: [AuthCheck]
  },
  {
    path: 'sign-in',
    component: SignInComponent,canActivate: [AuthCheck]
  },
  {
    path: 'user-list', 
    component: ListUserComponent,canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
