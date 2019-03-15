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
  addressLoading = false;
  weatherIcon = 'wi-day-sunny';
  weatherForecast = 'Sunny';
  windSpeed = '';
  windGust = '';
  location = 'Home';

  private weatherSub: Subscription;
  private geoSub: Subscription;

  constructor(
    private http: HttpClient,
    public weatherService: WeatherService
    ) {}

  ngOnInit() {
    this.weatherLoading = true;
    this.addressLoading = true;
    navigator.geolocation.getCurrentPosition((data) => {
      const latitude = data.coords.latitude;
      const longitude = data.coords.longitude;
      this.weatherService.getWeather(latitude, longitude);

      this.geoSub = this.weatherService.getGeoListener()
      .subscribe((location: any) => {
        this.addressLoading = false;
        this.location = `${location.city}, ${location.state} ${location.postcode}`;
      });

      this.weatherSub = this.weatherService.getWeatherListener()
      .subscribe((weather: any) => {
        weather = weather.data;
        this.weatherLoading = false;
        this.temperature = Math.floor(weather.temperature);
        this.feelsLike = Math.floor(weather.apparentTemperature);
        this.windSpeed = weather.windSpeed;
        this.windGust = weather.windGust;

        if (weather.icon === 'clear-day') {
          this.weatherIcon = 'wi-day-sunny';
          this.weatherForecast = 'Sunny';
        } else if (weather.icon === 'clear-night') {
          this.weatherIcon = 'wi-night-clear';
          this.weatherForecast = 'Night Clear';
        } else if (weather.icon === 'rain') {
          this.weatherIcon = 'wi-showers';
          this.weatherForecast = 'Rain Showers';
        } else if (weather.icon === 'snow') {
          this.weatherIcon = 'wi-snow';
          this.weatherForecast = 'Snow Showers';
        } else if (weather.icon === 'sleet') {
          this.weatherIcon = 'wi-sleet';
          this.weatherForecast = 'Sleet';
        } else if (weather.icon === 'wind') {
          this.weatherIcon = 'wi-windy';
          this.weatherForecast = 'Windy';
        } else if (weather.icon === 'fog') {
          this.weatherIcon = 'wi-fog';
          this.weatherForecast = 'Fog';
        } else if (weather.icon === 'partly-cloudy-day') {
          this.weatherIcon = 'wi-day-cloudy';
          this.weatherForecast = 'Partly Cloudy';
        } else if (weather.icon === 'partly-cloudy-night') {
          this.weatherIcon = 'wi-night-partly-cloudy';
          this.weatherForecast = 'Partly Cloudy Night';
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
