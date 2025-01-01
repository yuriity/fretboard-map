import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { DeleteFretboardDialogComponent } from './delete-fretboard-dialog.component';

describe('DeleteFretboardDialogComponent', () => {
  let component: DeleteFretboardDialogComponent;
  let fixture: ComponentFixture<DeleteFretboardDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DeleteFretboardDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Fretboard' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteFretboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display fretboard title in confirmation message', () => {
    const content = fixture.debugElement.query(By.css('mat-dialog-content'));
    expect(content.nativeElement.textContent).toContain('Test Fretboard');
  });

  it('should close dialog on cancel button click', () => {
    const cancelButton = fixture.debugElement.query(By.css('.cancel-button'));
    cancelButton.triggerEventHandler('click');
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close dialog with true on confirm button click', () => {
    const confirmButton = fixture.debugElement.query(By.css('.confirm-button'));
    confirmButton.nativeElement.click();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
