import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WeatherService {
  private weather: any;
  private location: any;
  private weatherUpdated = new Subject();
  private getLocationUpdated = new Subject();
  constructor(private http: HttpClient) {}

  getWeatherListener() {
    return this.weatherUpdated.asObservable();
  }

  getGeoListener() {
    return this.getLocationUpdated.asObservable();
  }

  getWeather(lat, long) {
    const queryParams = `?latitude=${lat}&longitude=${long}`;
    this.http.get<{location: any}>('http://localhost:3000/weather/getlocation' + queryParams)
    .subscribe((data) => {
      this.location = data.location;
      this.getLocationUpdated.next(this.location);
    });
    this.http.get<{data: any, weekData: any}>('http://localhost:3000/weather/getweather' + queryParams)
      .subscribe((data) => {
        this.weather = data;
        this.weatherUpdated.next(this.weather);
      });
  }
}
