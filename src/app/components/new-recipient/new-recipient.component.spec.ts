import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankService } from 'src/app/services/bank.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewRecipientComponent } from './new-recipient.component';

describe('NewRecipientComponent', () => {
  let component: NewRecipientComponent;
  let fixture: ComponentFixture<NewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRecipientComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient },
        { provide: BankService},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
