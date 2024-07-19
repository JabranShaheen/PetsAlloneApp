import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { PetTypeService } from '../services/pettype.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-pets',
  templateUrl: './view-pets.component.html',
  styleUrls: ['./view-pets.component.css'],
})
export class ViewPetsComponent implements OnInit {
  pets: any[] = [];
  filteredPets: any[] = [];
  petTypes: any[] = [];
  selectedPetType: string = '';

  constructor(
    private petService: PetService,
    private petTypeService: PetTypeService,
    private datePipe: DatePipe,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.petService.getAllPets().subscribe((data) => {
      this.pets = data;
      this.filteredPets = data; // Initialize filteredPets with all pets
    });

    this.petTypeService.getAllPetTypes().subscribe((data) => {
      this.petTypes = data;
    });
  }

  onPetTypeChange(): void {
    if (this.selectedPetType) {
      this.filteredPets = this.pets.filter(
        (pet) => pet.petType == this.selectedPetType
      );
    } else {
      this.filteredPets = this.pets; // Show all pets if no pet type is selected
    }
  }

  getPetTypeName(petTypeId: number): string {
    const petType = this.petTypes.find((type) => type.id == petTypeId);
    return petType ? petType.typeName : 'Unknown';
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'MMMM d, y, h:mm a') || 'Date not available';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
    return this.authService.getUsername() || 'Guest';
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  onAddMissingPet(): void {
    this.router.navigate(['/add']);
  }

  onLogOut(): void
  {
     this.authService.logout();
  }
}
