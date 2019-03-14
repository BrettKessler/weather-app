import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WeatherService {
  private weather: any;
  private weatherUpdated = new Subject();
  constructor(private http: HttpClient) {}

  getWeatherListener() {
    return this.weatherUpdated.asObservable();
  }

  getWeather(lat, long) {
    const queryParams = `?latitude=${lat}&longitude=${long}`;
    this.http.get<{data: any}>('http://localhost:3000/weather/getweather' + queryParams)
      .subscribe((data) => {
        this.weather = data.data;
        this.weatherUpdated.next(this.weather);
      });
  }
}
