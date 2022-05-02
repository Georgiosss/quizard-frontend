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
import { FooComponent } from './foo/foo.component';
import { HttpClientModule } from '@angular/common/http';


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
    FooComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
