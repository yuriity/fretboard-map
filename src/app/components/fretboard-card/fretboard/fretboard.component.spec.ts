import {provideZonelessChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIconModule} from '@angular/material/icon';
import {signal} from '@angular/core';

import {FretboardComponent} from './fretboard.component';
import {GuitarFretComponent} from './guitar-fret/guitar-fret.component';
import {ViewOptions} from '../../../models/view-options';
import {FretboardSettings} from '../../../models/fretboard-settings';

describe('FretboardComponent', () => {
  let component: FretboardComponent;
  let fixture: ComponentFixture<FretboardComponent>;

  beforeEach(async () => {
    const mockSettings: FretboardSettings = {
      id: 'mock-id',
      title: signal('Mock Title'),
      expanded: signal(true),
      tuning: signal('E4,A3,D3,G3,B3,E2'),
      rootNote: signal('C'),
      scale: signal('Major Scale'),
      viewOption: signal(ViewOptions.TwelveFrets),
    };

    await TestBed.configureTestingModule({
      imports: [FretboardComponent, MatIconModule, GuitarFretComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardComponent);
    fixture.componentRef.setInput('fretboardSettings', mockSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).withContext('Component should be created').toBeTruthy();
  });

  it('should initialize with settings values', () => {
    expect(component.fretboardSettings().title())
      .withContext('Should initialize with correct title')
      .toBe('Mock Title');
    expect(component.fretboardSettings().viewOption())
      .withContext('Should initialize with correct viewOption')
      .toBe(ViewOptions.TwelveFrets);
    expect(component.fretboard()).withContext('Should initialize fretboard').toBeDefined();
  });

  it('should display 24 frets view when viewOption is TwentyFourFrets', () => {
    component.fretboardSettings().viewOption.set(ViewOptions.TwentyFourFrets);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('tr:first-child th');
    expect(headers.length).withContext('Should display 25 headers for 24 frets view').toBe(25); // 24 frets + 1 empty header
  });

  it('should display 12 frets view when viewOption is TwelveFrets', () => {
    component.fretboardSettings().viewOption.set(ViewOptions.TwelveFrets);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('tr:first-child th');
    expect(headers.length).withContext('Should display 13 headers for 12 frets view').toBe(13); // 12 frets + 1 empty header
  });
});
