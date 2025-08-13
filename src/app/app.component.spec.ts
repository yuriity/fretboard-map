import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';

import {AppComponent} from './app.component';
import {SettingsService} from './services/settings.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let settingsServiceSpy: jasmine.SpyObj<SettingsService>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    settingsServiceSpy = jasmine.createSpyObj('SettingsService', ['addFretboard'], {
      fretboards: () => [],
      defaultTuning: 'E4,B3,G3,D3,A2,E2',
      defaultFretboardViewOption: '24 frets',
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {provide: MatDialog, useValue: dialogSpy},
        {provide: SettingsService, useValue: settingsServiceSpy},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toBe('Fretboard Map');
  });

  it('should open dialog and add fretboard when dialog returns result', () => {
    const dialogResult = {
      title: 'New Fretboard',
      rootNoteName: 'E',
      scale: 'Major Scale',
    };
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(dialogResult),
    } as unknown as MatDialogRef<unknown>);

    component.onAddFretboardClick();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(settingsServiceSpy.addFretboard).toHaveBeenCalledWith(
      '1',
      'New Fretboard',
      settingsServiceSpy.defaultTuning,
      'E',
      'Major Scale',
      settingsServiceSpy.defaultFretboardViewOption,
      true,
    );
  });

  it('should not add fretboard when dialog is cancelled', () => {
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(null),
    } as unknown as MatDialogRef<unknown>);

    component.onAddFretboardClick();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(settingsServiceSpy.addFretboard).not.toHaveBeenCalled();
  });
});
