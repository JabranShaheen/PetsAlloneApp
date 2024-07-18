import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  
  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password).pipe(
      tap(response => {        
        this.router.navigate(['']);
      }),
      catchError(error => {
        this.errorMessage = 'Invalid username or password';
        return of(null); // Return an observable to complete the stream
      })
    ).subscribe();
  }
  OnCancel(): void{
    this.router.navigate(['']);
  }
}