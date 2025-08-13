import {provideZonelessChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GuitarFretComponent} from './guitar-fret.component';
import {GuitarFret, FretClass, NoteState} from '../../../../models/guitar-fret';
import {Note} from '../../../../models/notes';

describe('GuitarFretComponent', () => {
  let fixture: ComponentFixture<GuitarFretComponent>;
  let component: GuitarFretComponent;

  const baseFret: GuitarFret = {
    fretClass: FretClass.Default,
    noteState: '' as NoteState,
    note: new Note('C', 4),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuitarFretComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(GuitarFretComponent);
    component = fixture.componentInstance;
  });

  /**
   * Override the signal input for testing.
   * This is needed because InputSignal does not expose .set(),
   * and fixture.componentRef.setInput() does not work for function-based signals.
   */
  function setFretInput(fretValue: GuitarFret) {
    // @ts-expect-error: test override for signal input
    component.fret = () => fretValue;
  }

  it('should create with valid fret input', () => {
    setFretInput(baseFret);
    fixture.detectChanges();
    expect(component).withContext('Component should be created with valid fret input').toBeTruthy();
  });

  it('should render note name in uppercase', () => {
    setFretInput({...baseFret, note: new Note('d#', 4)});
    fixture.detectChanges();
    const noteMark = fixture.nativeElement.querySelector('.note-mark');
    expect(noteMark.textContent.trim())
      .withContext('Note mark should render note name in uppercase')
      .toBe('D#');
  });

  it('should apply correct fretClass to background and boxes', () => {
    setFretInput({...baseFret, fretClass: FretClass.Twelves});
    fixture.detectChanges();
    const bg = fixture.nativeElement.querySelector('.background');
    expect(bg.classList)
      .withContext('Background should have class for fretClass')
      .toContain('twelves');
    const topBox = fixture.nativeElement.querySelector('.top-box');
    expect(topBox.classList)
      .withContext('Top box should have class for fretClass')
      .toContain('twelves');
  });

  it('should apply root-note class', () => {
    setFretInput({...baseFret, noteState: NoteState.RootNote});
    fixture.detectChanges();
    const noteMark = fixture.nativeElement.querySelector('.note-mark');
    expect(noteMark.classList)
      .withContext('Note mark should have root-note class')
      .toContain('root-note');
  });

  it('should apply active-note class', () => {
    setFretInput({...baseFret, noteState: NoteState.ActiveNote});
    fixture.detectChanges();
    const noteMark = fixture.nativeElement.querySelector('.note-mark');
    expect(noteMark.classList)
      .withContext('Note mark should have active-note class')
      .toContain('active-note');
  });

  it('should hide note mark for hidden-note', () => {
    setFretInput({...baseFret, noteState: NoteState.HiddenNote});
    fixture.detectChanges();
    const noteMark = fixture.nativeElement.querySelector('.note-mark');
    expect(noteMark.classList)
      .withContext('Note mark should have hidden-note class')
      .toContain('hidden-note');
    expect(getComputedStyle(noteMark).visibility)
      .withContext('Note mark should be hidden for hidden-note state')
      .toBe('hidden');
  });

  it('should throw if fret input is missing', () => {
    // Remove required input
    expect(() => fixture.detectChanges())
      .withContext('Should throw if required fret input is missing')
      .toThrow();
  });
});
