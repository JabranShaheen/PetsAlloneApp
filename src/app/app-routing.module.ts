import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPetsComponent } from './view-pets/view-pets.component';
import { LoginComponent } from './login/login.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: ViewPetsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddPetComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
