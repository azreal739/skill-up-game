
import { Component, OnInit } from '@angular/core';
import { ApiService, WeatherForecast } from 'src/services/ApiService';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  template: `
    <ul>
      @for (forecast of forecasts; track forecast) {
        <li>
          <span class="date">{{ forecast.date }}</span>
          <span class="temp">{{ forecast.temperatureC }}°C</span>
          <span class="summary">{{ forecast.summary }}</span>
        </li>
      }
    </ul>
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
        margin: 0;
        padding: 0;
        max-height: 16rem;
        overflow-y: auto;

        li {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.375rem 1rem;
          border-bottom: 1px solid #eee;

          .temp {
            font-weight: 600;
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
export class WeatherComponent implements OnInit {
  forecasts: WeatherForecast[] = [];
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getWeatherForecast().subscribe({
      next: (data) => (this.forecasts = data),
      error: () => (this.errorMessage = 'Could not load the weather forecast.'),
    });
  }
}
