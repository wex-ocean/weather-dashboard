import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ForecastItem, ForecastResponse, WeatherData } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);

  private buildParams(city: string): HttpParams {
    return new HttpParams()
      .set('q', city.trim())
      .set('units', 'metric')
      .set('appid', environment.apiKey);
  }

  getWeather(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${environment.apiUrl}/weather`, {
      params: this.buildParams(city),
    });
  }

  getForecast(city: string): Observable<ForecastItem[]> {
    return this.http
      .get<ForecastResponse>(`${environment.apiUrl}/forecast`, { params: this.buildParams(city) })
      .pipe(map((res) => res.list.filter((item) => item.dt_txt.includes('12:00:00'))));
  }
}