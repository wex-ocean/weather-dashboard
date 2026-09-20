import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ForecastItem, Unit } from '../../models/weather.model';
import { TempPipe } from '../../pipes/temp-pipe';

@Component({
  selector: 'app-forecast',
  imports: [DatePipe, TempPipe],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css',
})
export class Forecast {
  readonly days = input.required<ForecastItem[]>();
  readonly unit = input<Unit>('C');
}