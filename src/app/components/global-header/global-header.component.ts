import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent {
  @Input() deviceXs: boolean;

  constructor() { }
}
