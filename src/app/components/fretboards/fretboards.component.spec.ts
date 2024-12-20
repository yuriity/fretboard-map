import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretboardsComponent } from './fretboards.component';

describe('FretboardsComponent', () => {
  let component: FretboardsComponent;
  let fixture: ComponentFixture<FretboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FretboardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
