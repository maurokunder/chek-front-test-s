import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange} from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chek-front-test-s';
  mediaSub: Subscription;
  deviceXs: boolean;
  constructor(
    public mediaObserver: MediaObserver,
  ) {}

  public ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    }); 
  }
  public ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }
}