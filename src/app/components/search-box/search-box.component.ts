import { Component, OnInit, ViewEncapsulation, HostListener, Output, EventEmitter, Input, SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';
import { trigger, transition, animate, style } from '@angular/animations'
import { User } from 'src/app/models/User'

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})

export class SearchBoxComponent implements OnInit {
  
  @Output() closeSearchBox = new EventEmitter();
  
  @Input() options;
  
  encapsulation: ViewEncapsulation.None
  myControl = new FormControl();
  //options: string[] = ["Anisha", "Priyanka", "Shruti", "Shubhangi", "Sunidhi", "Sanyam", "Disha", "Ritika"];
  filteredOptions: Observable<User[]>;

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    //Escape pressed
    if(event.keyCode === 27)
      this.closeSearchBox.emit({});
  }

  constructor(private mapService:MapService) { }
  

  // ngOnChanges(changes: { [property: string]: SimpleChange }){
  //   //If the center changes
  //   if(changes['options'])
  //     console.log('changed')
  // }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : [])
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onKeyPress(event){
    let id,name;
    if(this.myControl != undefined && this.myControl.value){
      id = this.myControl.value.id;
      name = this.myControl.value.name? this.myControl.value.name: this.myControl.value;
    }
    this.closeSearchBox.emit({id,name});
  }

}
