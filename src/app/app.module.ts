import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [
    AppComponent,
    NopagesfoundComponent,
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
