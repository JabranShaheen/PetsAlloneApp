import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'https://petsaloneapi.azurewebsites.net/api/Pets'; // Adjust the URL to your API endpoint

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAllPets(): Observable<Pet[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Pet[]>(this.apiUrl, { headers });
  }

  getPetById(id: number): Observable<Pet> {
    const headers = this.getAuthHeaders();
    return this.http.get<Pet>(`${this.apiUrl}/${id}`, { headers });
  }

  addPet(pet: Pet): Observable<Pet> {
    const headers = this.getAuthHeaders();
    return this.http.post<Pet>(this.apiUrl, pet, { headers });
  }

  updatePet(pet: Pet): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(`${this.apiUrl}/${pet.id}`, pet, { headers });
  }

  deletePet(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
