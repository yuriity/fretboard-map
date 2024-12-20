import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFretboardDialogComponent } from './add-fretboard-dialog.component';

describe('AddFretboardDialogComponent', () => {
  let component: AddFretboardDialogComponent;
  let fixture: ComponentFixture<AddFretboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFretboardDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFretboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
