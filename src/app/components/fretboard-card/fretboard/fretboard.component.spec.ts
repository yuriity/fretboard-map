import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { FretboardComponent } from './fretboard.component';
import { GuitarFretComponent } from './guitar-fret/guitar-fret.component';
import { ViewOptions } from '../../../models/view-options';
import { Fretboard } from '../../../models/fretboard';
import { Note } from '../../../models/notes';
import { Scale } from '../../../models/scale';

describe('FretboardComponent', () => {
  let component: FretboardComponent;
  let fixture: ComponentFixture<FretboardComponent>;

  const mockFretboard = new Fretboard(
    [
      new Note('E', 4),
      new Note('A', 3),
      new Note('D', 3),
      new Note('G', 3),
      new Note('B', 3),
      new Note('E', 2),
    ],
    new Scale('C', null)
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FretboardComponent, MatIconModule, GuitarFretComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.viewOption).toBe(Object.values(ViewOptions)[0]);
    expect(component.fretboard).toBeNull();
  });

  it('should render null fretboard message when fretboard is null', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fretboard is null!');
  });

  it('should display 24 frets view when viewOption is TwentyFourFrets', () => {
    component.fretboard = mockFretboard;
    component.viewOption = ViewOptions.TwentyFourFrets;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('tr:first-child th');
    expect(headers.length).toBe(25); // 24 frets + 1 empty header
  });

  it('should display 12 frets view when viewOption is TwelveFrets', () => {
    component.fretboard = mockFretboard;
    component.viewOption = ViewOptions.TwelveFrets;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('tr:first-child th');
    expect(headers.length).toBe(13); // 12 frets + 1 empty header
  });
});
