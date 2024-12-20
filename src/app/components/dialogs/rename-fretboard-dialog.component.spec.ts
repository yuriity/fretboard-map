import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameFretboardDialogComponent } from './rename-fretboard-dialog.component';

describe('RenameFretboardDialogComponent', () => {
  let component: RenameFretboardDialogComponent;
  let fixture: ComponentFixture<RenameFretboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenameFretboardDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RenameFretboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
