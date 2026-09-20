import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../models/weather.model';

@Pipe({ name: 'temp' })
export class TempPipe implements PipeTransform {
  transform(celsius: number, unit: Unit): string {
    const value = unit === 'F' ? (celsius * 9) / 5 + 32 : celsius;
    return `${Math.round(value)}°${unit}`;
  }
}