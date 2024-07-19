import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetTypeService {
  private apiUrl = 'https://petsaloneapi.azurewebsites.net/api/PetType'; // Adjust the URL as needed
  
  constructor(private http: HttpClient) {}

  getAllPetTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
