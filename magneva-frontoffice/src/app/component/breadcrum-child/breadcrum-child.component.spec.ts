import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumChildComponent } from './breadcrum-child.component';

describe('BreadcrumChildComponent', () => {
  let component: BreadcrumChildComponent;
  let fixture: ComponentFixture<BreadcrumChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreadcrumChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
