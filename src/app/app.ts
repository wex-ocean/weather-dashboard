import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchBar } from './components/search-bar/search-bar';
import { WeatherCard } from './components/weather-card/weather-card';
import { WeatherService } from './services/weather';
import { WeatherData, ForecastItem, Unit } from './models/weather.model';
import { forkJoin } from 'rxjs';
import { Forecast } from './components/forecast/forecast';

@Component({
  selector: 'app-root',
  imports: [SearchBar, WeatherCard, Forecast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly weatherService = inject(WeatherService);
  protected readonly forecast = signal<ForecastItem[]>([]);

  protected readonly weather = signal<WeatherData | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  private readonly storageKey = 'recent-cities';
  protected readonly recent = signal<string[]>(this.loadRecent());

  private loadRecent(): string[] {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
      return Array.isArray(raw)
        ? raw.filter((c): c is string => typeof c === 'string').slice(0, 5)
        : [];
    } catch {
      return [];
    }
  }

  private saveRecent(city: string): void {
    const list = [
      city,
      ...this.recent().filter((c) => c.toLowerCase() !== city.toLowerCase()),
    ].slice(0, 5);
    this.recent.set(list);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    } catch {
      // storage unavailable, ignore
    }
  }

  protected onSearch(city: string): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      weather: this.weatherService.getWeather(city),
      forecast: this.weatherService.getForecast(city),
    }).subscribe({
      next: ({ weather, forecast }) => {
        this.weather.set(weather);
        this.forecast.set(forecast);
        this.saveRecent(weather.name);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.weather.set(null);
        this.forecast.set([]);
        this.error.set(err.status === 404 ? 'City not found.' : 'Something went wrong. Try again.');
        this.loading.set(false);
      },
    });
  }
  protected readonly unit = signal<Unit>('C');

  protected toggleUnit(): void {
    this.unit.update((u) => (u === 'C' ? 'F' : 'C'));
  }
  protected useMyLocation(): void {
    if (!navigator.geolocation) {
      this.error.set('Geolocation is not supported by your browser.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        forkJoin({
          weather: this.weatherService.getWeatherByCoords(coords.latitude, coords.longitude),
          forecast: this.weatherService.getForecastByCoords(coords.latitude, coords.longitude),
        }).subscribe({
          next: ({ weather, forecast }) => {
            this.weather.set(weather);
            this.forecast.set(forecast);
            this.saveRecent(weather.name);
            this.loading.set(false);
          },
          error: () => {
            this.weather.set(null);
            this.forecast.set([]);
            this.error.set('Something went wrong. Try again.');
            this.loading.set(false);
          },
        });
      },
      () => {
        this.loading.set(false);
        this.error.set('Location access denied.');
      },
    );
  }
}
