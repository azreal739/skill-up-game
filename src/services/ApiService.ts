import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

/**
 * Client for the mock API served by MSW (see backend/handlers.ts).
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getWeatherForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>('/weather');
  }

  getCities(): Observable<string[]> {
    return this.http.get<string[]>('/cities');
  }

  addCity(newCity: string): Observable<unknown> {
    return this.http.post('/cities', { city: newCity });
  }
}
