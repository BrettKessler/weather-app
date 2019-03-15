import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { _ } from 'underscore';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, OnDestroy {

  private weatherSub: Subscription;

  constructor(public weatherService: WeatherService) { }

  public daysOfWeek: any [] = [];

  ngOnInit() {
    this.weatherSub = this.weatherService.getWeatherListener()
    .subscribe((weather: any) => {
      const daysOfWeekData = weather.weekData.data;
      const slicedDaysOfWeek = daysOfWeekData.slice(1, 6);
      _.each(slicedDaysOfWeek, (day) => {
        console.log(day);
        const days = moment.unix(day.time).format('dddd');
        day.time = days;
        if (day.icon === 'clear-day') {
          day.icon = 'wi-day-sunny';
          day.weatherForecast = 'Sunny';
        } else if (day.icon === 'clear-night') {
          day.icon = 'wi-night-clear';
          day.weatherForecast = 'Night Clear';
        } else if (day.icon === 'rain') {
          day.icon = 'wi-showers';
          day.weatherForecast = 'Rain Showers';
        } else if (day.icon === 'snow') {
          day.icon = 'wi-snow';
          day.weatherForecast = 'Snow Showers';
        } else if (day.icon === 'sleet') {
          day.icon = 'wi-sleet';
          day.weatherForecast = 'Sleet';
        } else if (day.icon === 'wind') {
          day.icon = 'wi-windy';
          day.weatherForecast = 'Windy';
        } else if (day.icon === 'fog') {
          day.icon = 'wi-fog';
          day.weatherForecast = 'Fog';
        } else if (day.icon === 'partly-cloudy-day') {
          day.icon = 'wi-day-cloudy';
          day.weatherForecast = 'Partly Cloudy';
        } else if (day.icon === 'partly-cloudy-night') {
          day.icon = 'wi-night-partly-cloudy';
          day.weatherForecast = 'Partly Cloudy Night';
        }

        day.apparentTemperatureHigh = Math.floor(day.apparentTemperatureHigh);
        day.apparentTemperatureLow = Math.floor(day.apparentTemperatureLow);
        this.daysOfWeek.push(day);
      });
    });
  }
  ngOnDestroy() {
    this.weatherSub.unsubscribe();
  }
}
