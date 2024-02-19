import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentContentComponent } from './appointment-content.component';

describe('AppointmentContentComponent', () => {
  let component: AppointmentContentComponent;
  let fixture: ComponentFixture<AppointmentContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
