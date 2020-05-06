import { Component, OnInit, Inject, Input, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";
import { UserData } from 'src/app/models/UserData';
import { MapService } from 'src/app/services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  private map;
  private markerLayer:L.Marker[];
  
  @Input() public markers: UserData[]; // Markers to overlay on Map
  @Input() public center: { latitude: number, longitude: number };


  constructor(private mapService:MapService) { this.markerLayer = new Array();}

  ngOnInit(): void {
    //this.__initializeMap();
    //this.__renderMap();
    // this.__showMarkers();
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }){
    // Extract changes to the input property by its name
    
    //If the center changes
    if(changes['center']){
      if(this.map == null){
        this.__initializeMap();
        this.__renderMap();
      }
      this.map.flyTo([+this.center.latitude, +this.center.longitude], 22)
    }

    //If the markers' position changes
    if(changes['markers']) {
      this.deleteMarkers();
      this.__showMarkers();
    }

 }

  private __initializeMap(){
    this.map = L.map('map', {
      center: [ this.center.latitude, this.center.longitude ],
      zoom: 22
    });
  }

  private __renderMap(){

    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', 
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 23,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoic2hydXRpa2F0eWFsIiwiYSI6ImNrOWNqdXgwejAwMXczbXM1MmFtbm1uaGYifQ.fRRlCnsRnu4JpyJLsAL45g'
    });

    tiles.addTo(this.map); 
  }

  protected __showMarkers(): void
  {
    if (this.markers !== undefined && this.markers != null && this.markers.length > 0)
    {
      const n: number = this.markers.length;
      let i: number, id: string;
      let m: L.Marker;
  
      let x: number;
      let y: number;
  
      for (i = 0; i < n; ++i) {
        id = this.markers[i].id;
        x = +this.markers[i].latitude;
        y = +this.markers[i].longitude;
        if (x !== undefined && !isNaN(x) && y !== undefined && !isNaN(y))
        {
          // okay to add the icon
          m = L.marker([x, y]).addTo(this.map);
          m.bindPopup("User "+`${id}`);
          this.markerLayer.push(m);
        }
        else
        {
          // implement your own error handling
          console.log('MARKER ERROR, Marker number: ', (i+1), 'x: ', x, ' y: ', y);
        }
      }
    }
  }

  //Delete existing markers
  protected deleteMarkers(){
    for(let i=0; i<this.markerLayer.length; i++)
      this.map.removeLayer(this.markerLayer[i]);
  }
}
