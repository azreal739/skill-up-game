
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from 'src/services/ApiService';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [FormsModule],
  template: `
    <ul>
      @for (city of cities; track city) {
        <li>{{ city }}</li>
      }
    </ul>
    
    <div class="add-city">
      <input [(ngModel)]="newCity" placeholder="Add a city" (keyup.enter)="onAddCity()" />
      <button (click)="onAddCity()" [disabled]="!newCity.trim()">Add City</button>
    </div>
    @if (errorMessage) {
      <p class="error">{{ errorMessage }}</p>
    }
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
          border-bottom: 1px solid var(--ea-border);
        }
      }

      .add-city {
        display: flex;
        gap: 0.5rem;
        justify-content: center;

        input {
          border: 1px solid var(--ea-border);
          border-radius: 10px;
          padding: 0.5em 0.75em;
          background: rgba(7, 10, 20, 0.6);
          color: var(--ea-text);
        }

        button {
          background: linear-gradient(110deg, rgba(34, 211, 238, 0.92), rgba(167, 139, 250, 0.92));
          border: none;
          border-radius: 10px;
          color: #06121a;
          font-weight: 600;
          padding: 0.5em 1em;
          cursor: pointer;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }

      .error {
        color: var(--ea-danger);
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
