import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFretboardDialogComponent } from './delete-fretboard-dialog.component';

describe('DeleteFretboardDialogComponent', () => {
  let component: DeleteFretboardDialogComponent;
  let fixture: ComponentFixture<DeleteFretboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFretboardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFretboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
