import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { WeatherData } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);

  getWeather(city: string): Observable<WeatherData> {
    const params = new HttpParams()
      .set('q', city.trim())
      .set('units', 'metric')
      .set('appid', environment.apiKey);

    return this.http.get<WeatherData>(`${environment.apiUrl}/weather`, { params });
  }
}