import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { INIT_COORDS } from './token';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  //This moves the definition of the map center to the highest level in the Angular application 
  //(where it is easily seen and almost self-documenting).
  providers: [
    { provide: INIT_COORDS, useValue: {latitude: 28.5754, longitude: 77.2425} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
