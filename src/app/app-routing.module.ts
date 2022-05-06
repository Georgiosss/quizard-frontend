import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { LoginComponent } from './login/login.component';
import { QuestionsManagementComponent } from './questions-management/questions-management.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { MyClassesComponent } from './my-classes/my-classes.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'about-us', component: AboutUsComponent},
  {path: 'game-rules', component: GameRulesComponent},
  {path: 'questions-management', component: QuestionsManagementComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'my-classes', component: MyClassesComponent},
  { path: '', component: LoginComponent},
  { path: 'log-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = 
[AboutUsComponent, 
  GameRulesComponent,
  LoginComponent,
ProfileComponent,
QuestionsManagementComponent,
ContactComponent,
MyClassesComponent];