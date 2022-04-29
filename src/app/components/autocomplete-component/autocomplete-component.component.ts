import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-component',
  templateUrl: './autocomplete-component.component.html',
  styleUrls: ['./autocomplete-component.component.scss']
})
export class AutocompleteComponentComponent implements OnChanges {
  @Input() dataSource: any = [];
  @Output() newItemEvent = new EventEmitter<any>();
  
  public options: any = this.dataSource;
  myControl = new FormControl();

  filteredOptions: Observable<any[]>;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.options = this.dataSource;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.fullName)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(user: any): string {
    return user && user.fullName ? user.fullName : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }

  public objectAfterSelection(option: any){
    this.newItemEvent.emit(option);
  }
}
