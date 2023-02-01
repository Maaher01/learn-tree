import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule,
    ForgotPasswordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
