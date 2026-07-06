import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/services/ApiService';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <ul>
      <li *ngFor="let city of cities">{{ city }}</li>
    </ul>

    <div class="add-city">
      <input [(ngModel)]="newCity" placeholder="Add a city" (keyup.enter)="onAddCity()" />
      <button (click)="onAddCity()" [disabled]="!newCity.trim()">Add City</button>
    </div>
    <p class="error" *ngIf="errorMessage">{{ errorMessage }}</p>
  `,
  styles: [
    `
      :host {
        display: block;
        text-align: center;
      }

      ul {
        list-style: none;
        margin: 0 0 1rem;
        padding: 0;
        max-height: 14rem;
        overflow-y: auto;

        li {
          padding: 0.375rem 1rem;
          border-bottom: 1px solid #eee;
        }
      }

      .add-city {
        display: flex;
        gap: 0.5rem;
        justify-content: center;

        input {
          border: 1px solid #ccc;
          border-radius: 0.375em;
          padding: 0.5em 0.75em;
        }

        button {
          background-color: black;
          border: none;
          border-radius: 0.375em;
          color: white;
          padding: 0.5em 1em;
          cursor: pointer;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }

      .error {
        color: #dc2626;
        margin-top: 0.5rem;
      }
    `,
  ],
})
export class CitiesComponent implements OnInit {
  cities: string[] = [];
  newCity = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.apiService.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: () => (this.errorMessage = 'Could not load cities.'),
    });
  }

  onAddCity(): void {
    if (!this.newCity.trim()) {
      return;
    }
    this.errorMessage = '';
    this.apiService.addCity(this.newCity.trim()).subscribe({
      next: () => {
        this.newCity = '';
        this.loadCities();
      },
      error: (err: HttpErrorResponse) =>
        (this.errorMessage = err.error?.message ?? 'Could not add city.'),
    });
  }
}
