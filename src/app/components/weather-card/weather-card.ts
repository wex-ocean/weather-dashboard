import { Component, input } from '@angular/core';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { WeatherData } from '../../models/weather.model';

@Component({
  selector: 'app-weather-card',
  imports: [DecimalPipe, TitleCasePipe],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.scss',
})
export class WeatherCard {
  readonly weather = input.required<WeatherData>();
}