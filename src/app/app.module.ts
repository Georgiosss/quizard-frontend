import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TmpComponent } from './tmp/tmp.component';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileComponent } from './profile/profile.component';
import { MyClassesComponent } from './my-classes/my-classes.component';
import { ContactComponent } from './contact/contact.component';
import { QuestionsManagementComponent } from './questions-management/questions-management.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MyClassComponent } from './my-class/my-class.component';
import { DialogOverviewExampleDialog } from './my-classes/my-classes.component';
import { DialogOverviewExampleDialog2 } from './my-classes/my-classes.component';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { NotificationDialogComponent } from './shared/notification-dialog/notification-dialog.component';
import { InputDialogComponent } from './shared/input-dialog/input-dialog.component';
import { QuestionsEditorComponent } from './questions-editor/questions-editor.component';
import { GameComponent } from './game/game.component';
import { TttComponent } from './ttt/ttt.component';
import { GameService } from './shared/game.service';
import { GameQuestionComponent } from './game-question/game-question.component';
import { CreateGameComponent } from './create-game/create-game.component';



@NgModule({
  declarations: [
    AppComponent,
    TmpComponent,
    NavigationComponent,
    routingComponents,
    ProfileComponent,
    MyClassesComponent,
    ContactComponent,
    QuestionsManagementComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    MainPageComponent,
    MyClassComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog2,
    NotificationDialogComponent,
    InputDialogComponent,
    QuestionsEditorComponent,
    GameComponent,
    TttComponent,
    GameQuestionComponent,
    CreateGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
