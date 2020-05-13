import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MapService } from 'src/app/services/map.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }

  options;
  buildingId = '1';
  buildingName = 'Anisha\'s Home' 
  userId = '';
  searchFor:string;
  searchBoxVisible:boolean = false; 
  toolbarVisible:boolean = true;
  mobileQuery: MediaQueryList;
  @ViewChild('snav') sidenav:MatSidenav;


  fillerNav = [ { id:0, icon: 'search', content: 'Find User'},  //account_circle
                { id:1, icon: 'apartment', content: 'Change Building'},
                { id:2, icon: 'add_circle', content: 'Add Building'},
                { id:3, icon: 'settings', content: 'Settings'},
                { id:4, icon: 'power_settings_new', content: 'Log Out'}];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
    private dialog: MatDialog, private mapService:MapService,private snackBar:MatSnackBar) {
    
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  
  }

  onClick(event, id){
    
    // console.log("Clicked "+this.fillerNav[id].content)

    switch(id){
      case 0:
        this.userId = '';
        this.searchFor = 'user';
        this.toolbarVisible = false;
        this.sidenav.toggle();
        this.searchBoxVisible = true;
        this.mapService.getUserNames().subscribe(users => {
          this.options = users;
        });
        break;
      case 1:
        this.searchFor = 'building';
        this.toolbarVisible = false;
        this.sidenav.toggle();
        this.searchBoxVisible = true;
        this.mapService.getBuildingNames().subscribe(buildings => {
          this.options = buildings;
        });
        break;
      case 2:
        this.openAddBuilding();
        break;
      case 3:
        break;
      case 4:
        break;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openAddBuilding(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Add building'
    };

    dialogConfig.panelClass = 'myapp-no-padding-dialog';
    dialogConfig.minHeight = '340px';
    dialogConfig.minWidth = '450px';

    this.dialog.open(DialogBoxComponent, dialogConfig);
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public closeSearch({id, name}){
    this.searchBoxVisible = false;
    this.toolbarVisible = true;
    this.sidenav.toggle();

    if(!id && name)
      if(this.searchFor == 'building')
        this.openSnackBar(name + ' is not a valid premise','Close');
      else
        this.openSnackBar(name + ' is not inside ' + this.buildingName,'Close');

    else if(this.searchFor == 'building' && id){
      this.buildingId = id;
      this.buildingName = name;
    }
    else{ 
      this.userId = id;
    }
  }
}

