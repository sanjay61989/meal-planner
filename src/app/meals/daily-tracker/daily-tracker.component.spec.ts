import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTrackerComponent } from './daily-tracker.component';

describe('DailyTrackerComponent', () => {
  let component: DailyTrackerComponent;
  let fixture: ComponentFixture<DailyTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
