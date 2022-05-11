import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { GameRulesComponent } from './game-rules/game-rules.component';
import { LoginComponent } from './login/login.component';
import { QuestionsManagementComponent } from './questions-management/questions-management.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { MyClassesComponent } from './my-classes/my-classes.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MyClassComponent } from './my-class/my-class.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: 'about-us', component: AboutUsComponent},
  {path: 'game-rules', component: GameRulesComponent},
  {path: 'questions-management', component: QuestionsManagementComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'class/:classCode', component: MyClassComponent},
  {path: 'my-classes', component: MyClassesComponent},
  { path: '', component: LoginComponent},
  { path: 'main-page', component: MainPageComponent, canActivate: [AuthGuard]},
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