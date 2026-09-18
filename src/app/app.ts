import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchBar } from './components/search-bar/search-bar';
import { WeatherCard } from './components/weather-card/weather-card';
import { WeatherService } from './services/weather';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  imports: [SearchBar, WeatherCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly weatherService = inject(WeatherService);

  protected readonly weather = signal<WeatherData | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  protected onSearch(city: string): void {
    this.loading.set(true);
    this.error.set('');

    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weather.set(data);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.weather.set(null);
        this.error.set(err.status === 404 ? 'City not found.' : 'Something went wrong. Try again.');
        this.loading.set(false);
      },
    });
  }
}