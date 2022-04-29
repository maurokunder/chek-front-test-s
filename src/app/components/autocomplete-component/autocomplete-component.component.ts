import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Recipient } from 'src/app/models/cuenta';

@Component({
  selector: 'app-autocomplete-component',
  templateUrl: './autocomplete-component.component.html',
  styleUrls: ['./autocomplete-component.component.scss']
})
export class AutocompleteComponentComponent implements OnInit {
  @Input() dataSource: any;
  @Output() newItemEvent = new EventEmitter<any>();
  
  myControl = new FormControl();
  
  constructor() { }

  ngOnInit(): void {

  }
  
  public objectAfterSelection(option: any){
    this.newItemEvent.emit(option);
  }
}
