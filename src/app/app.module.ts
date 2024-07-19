import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { ViewPetsComponent } from './view-pets/view-pets.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddPetComponent,
    ViewPetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),    
    provideHttpClient(withFetch()),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
