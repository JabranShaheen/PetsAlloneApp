import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://petsaloneapi.azurewebsites.net/api/Auth';
  private token: string | null = null;
  private username: string | null = null; // Add username variable

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ username, password });
    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).pipe(
      map(response => {
        if (response && response.token) {
          this.token = response.token;
          this.username = username; // Store the username upon successful login
        }
        return response;
      })
    );
  }

  logout(): void {
    this.token = null;
    this.username = null; // Clear username on logout
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.token != null;
  }

  getUsername(): string | null {
    return this.username;
  }
}
