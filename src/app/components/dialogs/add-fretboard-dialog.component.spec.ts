import {provideZonelessChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {AddFretboardDialogComponent} from './add-fretboard-dialog.component';

describe('AddFretboardDialogComponent', () => {
  let component: AddFretboardDialogComponent;
  let fixture: ComponentFixture<AddFretboardDialogComponent>;
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
        MatSelectModule,
        ReactiveFormsModule,
        AddFretboardDialogComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFretboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).withContext('Component should be created').toBeTruthy();
  });

  it('should initialize form controls with default values', () => {
    expect(component.titleFormControl.value)
      .withContext('Title form control should be initialized with dialog data')
      .toBe('Test Fretboard');
    expect(component.rootNoteControl.value)
      .withContext('Root note control should be initialized to C')
      .toBe('C');
    expect(component.scaleControl.value)
      .withContext('Scale control should be initialized to first scale name')
      .toBe(component.scaleNames[0]);
  });

  it('should validate required fields', () => {
    component.titleFormControl.setValue('');
    component.rootNoteControl.setValue('');
    component.scaleControl.setValue('');

    expect(component.titleFormControl.hasError('required'))
      .withContext('Title should be required')
      .toBeTruthy();
    expect(component.rootNoteControl.hasError('required'))
      .withContext('Root note should be required')
      .toBeTruthy();
    expect(component.scaleControl.hasError('required'))
      .withContext('Scale should be required')
      .toBeTruthy();
  });

  it('should validate unique title', () => {
    component.titleFormControl.setValue('Existing Fretboard');
    expect(component.titleFormControl.hasError('notUnique'))
      .withContext('Title should be unique')
      .toBeTruthy();
  });

  it('should accept unique title', () => {
    component.titleFormControl.setValue('New Unique Title');
    expect(component.titleFormControl.valid)
      .withContext('Unique title should be valid')
      .toBeTruthy();
  });

  it('should close dialog on cancel', () => {
    component.onCancelClick();
    expect(dialogRef.close).withContext('Dialog should be closed on cancel').toHaveBeenCalled();
  });

  it('should return correct dialog result', () => {
    component.titleFormControl.setValue('New Board');
    component.rootNoteControl.setValue('D');
    component.scaleControl.setValue('Minor');

    expect(component.dialogResult).withContext('Dialog result should match form values').toEqual({
      title: 'New Board',
      rootNoteName: 'D',
      scale: 'Minor',
    });
  });
});
