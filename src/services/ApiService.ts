import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Adjust the URL if your API is hosted on a different domain/port.
  private apiUrl = 'http://localhost:5062';

  constructor(private http: HttpClient) {}

  // Get weather forecast data
  getWeatherForecastC(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(`/weatherforecastC`);
  }

  // Get list of cities
  getCitiesC(): Observable<string[]> {
    return this.http.get<string[]>(`/citiesC`);
  }

  // Add a new city (using a query parameter for simplicity)
  addCityC(newCity: string): Observable<any> {
    const url = `/citiesC?newCity=${encodeURIComponent(newCity)}`;
    return this.http.post(url, {}); // POST with an empty body
  }

  getWeatherForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(`/weather`);
  }

  getCities(): Observable<string[]> {
    return this.http.get<string[]>(`/cities`);
  }

  addCity(newCity: string): Observable<any> {
    return this.http.post(`/cities`, { city: newCity });
  }

}
