import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component ({
  selector: 'app-temp-widget',
  templateUrl: './temp-widget.component.html',
  styleUrls: ['./temp-widget.component.css']
})


export class TempWidgetComponent implements OnInit, OnDestroy {

  temperature: number;
  feelsLike: number;
  weatherLoading = false;
  weatherIcon = 'wi-day-sunny';
  weatherForcast = 'Sunny';
  windSpeed = '';
  windGust = '';

  private weatherSub: Subscription;

  constructor(
    private http: HttpClient,
    public weatherService: WeatherService
    ) {}

  ngOnInit() {
    this.weatherLoading = true;
    navigator.geolocation.getCurrentPosition((data) => {
      const latitude = data.coords.latitude;
      const longitude = data.coords.longitude;
      this.weatherService.getWeather(latitude, longitude);
      this.weatherSub = this.weatherService.getWeatherListener()
      .subscribe((weather: any) => {
        console.log(weather);
        this.weatherLoading = false;
        this.temperature = Math.floor(weather.temperature);
        this.feelsLike = Math.floor(weather.apparentTemperature);
        this.windSpeed = weather.windSpeed;
        this.windGust = weather.windGust;

        if (weather.icon === 'clear-day') {
          this.weatherIcon = 'wi-day-sunny';
          this.weatherForcast = 'Sunny';
        } else if (weather.icon === 'clear-night') {
          this.weatherIcon = 'wi-night-clear';
          this.weatherForcast = 'Night Clear';
        } else if (weather.icon === 'rain') {
          this.weatherIcon = 'wi-showers';
          this.weatherForcast = 'Rain Showers';
        } else if (weather.icon === 'snow') {
          this.weatherIcon = 'wi-snow';
          this.weatherForcast = 'Snow Showers';
        } else if (weather.icon === 'sleet') {
          this.weatherIcon = 'wi-sleet';
          this.weatherForcast = 'Sleet';
        } else if (weather.icon === 'wind') {
          this.weatherIcon = 'wi-windy';
          this.weatherForcast = 'Windy';
        } else if (weather.icon === 'fog') {
          this.weatherIcon = 'wi-fog';
          this.weatherForcast = 'Fog';
        } else if (weather.icon === 'partly-cloudy-day') {
          this.weatherIcon = 'wiwi-day-cloudy';
          this.weatherForcast = 'Partly Cloudy';
        } else if (weather.icon === 'partly-cloudy-night') {
          this.weatherIcon = 'wi-night-partly-cloudy';
          this.weatherForcast = 'Partly Cloudy Night';
        }
      });
    });
  }
  onGetWeather() {
    // this.weatherService.getWeather();
  }

  ngOnDestroy() {
    this.weatherSub.unsubscribe();
  }
}
