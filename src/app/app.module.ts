import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TempWidgetComponent } from './weather/temp-widget/temp-widget.component';
import { WeatherSearchComponent } from './weather/weather-search/weather-search.component';
import { ForecastComponent } from './weather/forecast/forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    TempWidgetComponent,
    WeatherSearchComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
