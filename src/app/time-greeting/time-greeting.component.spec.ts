import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGreetingComponent } from './time-greeting.component';

describe('TimeGreetingComponent', () => {
  let component: TimeGreetingComponent;
  let fixture: ComponentFixture<TimeGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeGreetingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
