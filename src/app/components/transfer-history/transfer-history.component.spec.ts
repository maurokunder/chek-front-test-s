import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferHistoryComponent } from './transfer-history.component';

describe('TransferHistoryComponent', () => {
  let component: TransferHistoryComponent;
  let fixture: ComponentFixture<TransferHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferHistoryComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient },
      ],   
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
