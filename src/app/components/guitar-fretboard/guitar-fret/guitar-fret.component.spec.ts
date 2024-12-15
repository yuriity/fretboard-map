import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarFretComponent } from './guitar-fret.component';

describe('GuitarFretComponent', () => {
  let component: GuitarFretComponent;
  let fixture: ComponentFixture<GuitarFretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuitarFretComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GuitarFretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
