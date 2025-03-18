import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService, WeatherForecast } from 'src/services/ApiService';
// import { ApiService, WeatherForecast } from './api.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  template: `
    <h1>Weather Forecast</h1>
    <ul>
      <li *ngFor="let forecast of forecasts">
        {{ forecast.date }}: {{ forecast.temperatureC }}°C - {{ forecast.summary }}
      </li>
    </ul>
  `,
  imports: [CommonModule],
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
export class WeatherComponent implements OnInit {
  forecasts: WeatherForecast[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getWeatherForecast().subscribe({
      next: (data) => (this.forecasts = data),
      error: (err) => console.error('Error fetching weather forecast', err),
    });
  }
}
