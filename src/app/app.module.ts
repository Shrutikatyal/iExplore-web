import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { INIT_COORDS } from './token';
import { RouterModule } from '@angular/router';
import { MaterialModule } from  './material.module';
import { MapContainerComponent } from './components/map-container/map-container.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapContainerComponent,
    SearchBoxComponent,
    DialogBoxComponent,
    HomeComponent,
    LoginComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      // { path: 'login', component:  LoginComponent },
      // { path: '', redirectTo:  '/login', pathMatch:  'full' },
      // { path: 'search', component: SearchBoxComponent }
    ])
  ],
  //This moves the definition of the map center to the highest level in the Angular application 
  //(where it is easily seen and almost self-documenting).
  providers: [
    { provide: INIT_COORDS, useValue: {latitude: 28.5754, longitude: 77.2425} }
  ],
  bootstrap: [AppComponent],
  entryComponents:[DialogBoxComponent]
})
export class AppModule { }
