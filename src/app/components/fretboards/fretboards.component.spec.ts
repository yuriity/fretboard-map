import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { signal } from '@angular/core';

import { FretboardsComponent } from './fretboards.component';
import { SettingsService } from '../../services/settings.service';

describe('FretboardsComponent', () => {
  let component: FretboardsComponent;
  let fixture: ComponentFixture<FretboardsComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    settingsServiceSpy = jasmine.createSpyObj(
      'SettingsService',
      ['removeFretboard'],
      {
        fretboards: signal([
          {
            id: '1',
            title: signal('Test Fretboard'),
            tuning: signal('E4,B3,G3,D3,A2,E2'),
            rootNote: signal('E'),
            scale: signal('Major'),
            viewOption: signal('24 frets'),
            expanded: signal(true),
          },
        ]),
      }
    );

    await TestBed.configureTestingModule({
      imports: [FretboardsComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: SettingsService, useValue: settingsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open rename dialog and update title when confirmed', () => {
    const fretboard = settingsServiceSpy.fretboards()[0];
    dialogSpy.open.and.returnValue({
      afterClosed: () => of('New Title'),
    } as any);

    component.openRenameFretboardDialog(fretboard);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(fretboard.title()).toBe('New Title');
  });

  it('should open delete dialog and remove fretboard when confirmed', () => {
    const fretboard = settingsServiceSpy.fretboards()[0];
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) } as any);

    component.openDeleteFretboardDialog(fretboard);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(settingsServiceSpy.removeFretboard).toHaveBeenCalledWith('1');
  });

  it('should not remove fretboard when delete is cancelled', () => {
    const fretboard = settingsServiceSpy.fretboards()[0];
    dialogSpy.open.and.returnValue({ afterClosed: () => of(false) } as any);

    component.openDeleteFretboardDialog(fretboard);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(settingsServiceSpy.removeFretboard).not.toHaveBeenCalled();
  });
});
