import { Component, Inject } from '@angular/core';
import { UserData } from './models/UserData';
import { MapService } from './services/map.service';
import { INIT_COORDS } from './token';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public markers: UserData[];
  
  markersSubscription:Subscription;
  timerSubscription:Subscription;

  constructor(private mapService:MapService,@Inject(INIT_COORDS) public center: {latitude: number, longitude: number} ){
    this.markers = [
      { id:'1', latitude: '28.5754', longitude: '77.2425' }
    ];
    this.fetchCenter();
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
    this.mapService.getMapCenter().subscribe(center => {
    });
  }

}
