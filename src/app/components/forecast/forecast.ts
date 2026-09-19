import { Component, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ForecastItem } from '../../models/weather.model';

@Component({
  selector: 'app-forecast',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css',
})
export class Forecast {
  readonly days = input.required<ForecastItem[]>();
}