import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exemple2Component } from './exemple2.component';

describe('Exemple2Component', () => {
  let component: Exemple2Component;
  let fixture: ComponentFixture<Exemple2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exemple2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Exemple2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
