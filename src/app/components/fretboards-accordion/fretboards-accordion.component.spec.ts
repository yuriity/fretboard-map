import {provideZonelessChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {signal} from '@angular/core';

import {FretboardsAccordionComponent} from './fretboards-accordion.component';
import {SettingsService} from '../../services/settings.service';

describe('FretboardAccordionComponent', () => {
  let component: FretboardsAccordionComponent;
  let fixture: ComponentFixture<FretboardsAccordionComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    settingsServiceSpy = jasmine.createSpyObj('SettingsService', ['removeFretboard'], {
      fretboards: signal([
        {
          id: '1',
          title: signal('Test Fretboard'),
          tuning: signal('E4,B3,G3,D3,A2,E2'),
          rootNote: signal('E'),
          scale: signal('Major Scale'),
          viewOption: signal('24 frets'),
          expanded: signal(true),
        },
      ]),
    });

    await TestBed.configureTestingModule({
      imports: [FretboardsAccordionComponent, NoopAnimationsModule],
      providers: [
        provideZonelessChangeDetection(),
        {provide: MatDialog, useValue: dialogSpy},
        {provide: SettingsService, useValue: settingsServiceSpy},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).withContext('Component should be created').toBeTruthy();
  });

  it('should open rename dialog and update title when confirmed', () => {
    const fretboard = settingsServiceSpy.fretboards()[0];
    dialogSpy.open.and.returnValue({
      afterClosed: () => of('New Title'),
    } as unknown as MatDialogRef<unknown>);

    component.openRenameFretboardDialog(fretboard);

    expect(dialogSpy.open).withContext('Rename dialog should be opened').toHaveBeenCalled();
    expect(fretboard.title())
      .withContext('Fretboard title should be updated after rename')
      .toBe('New Title');
  });

  it('should open delete dialog and remove fretboard when confirmed', () => {
    const fretboard = settingsServiceSpy.fretboards()[0];
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(true),
    } as unknown as MatDialogRef<unknown>);

    component.openDeleteFretboardDialog(fretboard);

    expect(dialogSpy.open).withContext('Delete dialog should be opened').toHaveBeenCalled();
    expect(settingsServiceSpy.removeFretboard)
      .withContext('Fretboard should be removed after confirmation')
      .toHaveBeenCalledWith('1');
  });

  it('should not remove fretboard when delete is cancelled', () => {
    const fretboard = settingsServiceSpy.fretboards()[0];
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(false),
    } as unknown as MatDialogRef<unknown>);

    component.openDeleteFretboardDialog(fretboard);

    expect(dialogSpy.open).withContext('Delete dialog should be opened').toHaveBeenCalled();
    expect(settingsServiceSpy.removeFretboard)
      .withContext('Fretboard should not be removed if cancelled')
      .not.toHaveBeenCalled();
  });
});
