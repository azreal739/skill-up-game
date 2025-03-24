import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/services/ApiService';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h1>Cities</h1>
    <ul>
      <li *ngFor="let city of cities">{{ city }}</li>
    </ul>

    <input [(ngModel)]="newCity" placeholder="Add a city" />
    <button (click)="onAddCity()">Add City</button>
  `,
  styles: [
    `
      :host {
        background: #fff;
    border-radius: 8px;
    padding: 10px;
    max-width: 500px;
    width: 100%;
    margin: 2rem auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: block;
    text-align: center;
      }
    `,
  ],
})
export class CitiesComponent implements OnInit {
  cities: string[] = [];
  newCity: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCitiesC();
  }

  loadCitiesC(): void {
    this.apiService.getCitiesC().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => console.error('Error fetching cities', err),
    });
  }

  onAddCity(): void {
    if (this.newCity.trim()) {
      this.apiService.addCityC(this.newCity).subscribe({
        next: () => {
          this.newCity = '';
          this.loadCitiesC(); // Refresh the list after adding a city
        },
        error: (err) => console.error('Error adding city', err),
      });
    }
  }
}
