import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})
export class WeatherSearchComponent implements OnInit {

  private weatherSub: Subscription;
  private geoSub: Subscription;

  constructor(public weatherService: WeatherService) { }
  public location: string;
  ngOnInit() {
    this.geoSub = this.weatherService.getGeoListener()
    .subscribe((location: any) => {
      this.location = `${location.city}, ${location.state}`;
    });
  }

}
