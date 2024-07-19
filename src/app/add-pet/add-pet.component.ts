import { Component } from '@angular/core';
import { PetService } from '../services/pet.service';
import { PetTypeService } from '../services/pettype.service';
import { Pet } from '../models/pet';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'],
})
export class AddPetComponent {
  pet: Pet = {
    id: 0,
    name: '',
    petType: 0,
    dateMissing: new Date(),
    ownerContactInfo: '',
    dateAdded: new Date(),
    userId: 0
  };
  petTypes: any[] = [];

  constructor(private petService: PetService, private petTypeService: PetTypeService, private router: Router) {}

  ngOnInit(): void {
    this.petTypeService.getAllPetTypes().subscribe(data => {
      this.petTypes = data;
    });
  }

  onSubmit(): void {
    if (this.pet.name !='')
    {
      this.pet.dateAdded = new Date(); // Set the dateAdded to current date
      this.petService.addPet(this.pet).subscribe(response => {
        console.log('Pet added successfully', response);
        this.router.navigate(['']);
        // Optionally, reset the form or navigate to another page
      }, error => {
        console.error('Error adding pet', error);
      });
    }
  }

  OnCancel(): void
  {
    this.router.navigate(['']);
  }
}
