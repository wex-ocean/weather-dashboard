export interface WeatherData {
  name: string;
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number };
  sys: { country: string };
}
    
export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export interface ForecastResponse {
  list: ForecastItem[];
}