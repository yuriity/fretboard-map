import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { RenameFretboardDialogComponent } from './rename-fretboard-dialog.component';

describe('RenameFretboardDialogComponent', () => {
  let component: RenameFretboardDialogComponent;
  let fixture: ComponentFixture<RenameFretboardDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<unknown>>;

  const mockDialogData = {
    newTitle: 'Test Fretboard',
    usedTitles: ['Existing Fretboard', 'Another Fretboard'],
  };

  beforeEach(async () => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RenameFretboardDialogComponent,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RenameFretboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form control with dialog data', () => {
    expect(component.titleFormControl.value).toBe('Test Fretboard');
  });

  it('should validate required field', () => {
    component.titleFormControl.setValue('');
    expect(component.titleFormControl.hasError('required')).toBeTruthy();
  });

  it('should validate unique title', () => {
    component.titleFormControl.setValue('Existing Fretboard');
    expect(component.titleFormControl.hasError('notUnique')).toBeTruthy();
  });

  it('should accept unique title', () => {
    component.titleFormControl.setValue('New Unique Title');
    expect(component.titleFormControl.valid).toBeTruthy();
  });

  it('should close dialog on cancel', () => {
    component.onCancelClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should allow unchanged title', () => {
    component.titleFormControl.setValue('Test Fretboard');
    expect(component.titleFormControl.valid).toBeTruthy();
  });
});
