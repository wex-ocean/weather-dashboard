import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Unit, WeatherData } from '../../models/weather.model';
import { TempPipe } from '../../pipes/temp-pipe';

@Component({
  selector: 'app-weather-card',
  imports: [TitleCasePipe, TempPipe],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  readonly weather = input.required<WeatherData>();
  readonly unit = input<Unit>('C');
}