import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretbordToolbarComponent } from './fretbord-toolbar.component';

describe('FretbordToolbarComponent', () => {
  let component: FretbordToolbarComponent;
  let fixture: ComponentFixture<FretbordToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FretbordToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FretbordToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
