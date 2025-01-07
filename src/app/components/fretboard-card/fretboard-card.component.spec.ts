import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretboardCardComponent } from './fretboard-card.component';

describe('FretboardCardComponent', () => {
  let component: FretboardCardComponent;
  let fixture: ComponentFixture<FretboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FretboardCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FretboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
