import { Component, OnInit, Inject, Input, SimpleChange } from '@angular/core';
import { UserData } from 'src/app/models/UserData';
import { MapService } from 'src/app/services/map.service';
import { INIT_COORDS } from 'src/app/token';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css']
})

export class MapContainerComponent implements OnInit {
  public markers: UserData[];

  markersSubscription:Subscription;
  timerSubscription:Subscription;

  @Input() buildingId;
  @Input() userId;

  constructor(private mapService:MapService,@Inject(INIT_COORDS) public center: {latitude: number, longitude: number} ){
    this.markers = [
      { id:'1', latitude: 28.5754, longitude: 77.2425, name:'Shruti'}
    ];
    this.fetchCenter();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void{
    //If the center changes
    if(changes['buildingId']){
      this.mapService.setBuildingId(this.buildingId);
      this.getBuildingCenter();
    }
  }

  private fetchCenter(): void {
    this.mapService.getMapCenter().subscribe(center => {
      this.center = center[0];
      this.refreshData();
    });
  }

  private refreshData(): void {
    this.markersSubscription = this.mapService.getMarkers().subscribe(markers => {
        this.markers = markers;
        this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    this.timerSubscription =timer(5000).subscribe(() => this.refreshData());
  }

  private getBuildingCenter(): void{
    this.mapService.getMapCenter().subscribe(center => { this.fetchCenter();
    });
  }

}

