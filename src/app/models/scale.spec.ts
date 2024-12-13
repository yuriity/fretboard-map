import { Note } from './notes';
import { NoteState } from './guitar-fret';
import { Scale } from './scale';
import { ScaleFormulas } from './scale-formulas';

const ChromaticScaleName = 'Chromatic Scale';
const MajorScaleName = 'Major Scale';
const MinorScaleName = 'Minor Scale';
const PentatonicMajorScale = 'Pentatonic Major Scale';
const PentatonicMinorScale = 'Pentatonic Minor Scale';

describe('Scale', () => {
  describe('constructor', () => {
    it('should create the C Major with the correct scale notes', () => {
      const rootNoteName = 'C';
      const expectedScaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];

      const scale = new Scale(rootNoteName, ScaleFormulas[MajorScaleName]);

      expect(scale['scaleNotes']).toEqual(expectedScaleNotes);
    });

    it('should create the C Minor with the correct scale notes', () => {
      const rootNoteName = 'C';
      const expectedScaleNotes = ['C', 'D', 'D#', 'F', 'G', 'G#', 'A#', 'C'];

      const scale = new Scale(rootNoteName, ScaleFormulas[MinorScaleName]);

      expect(scale['scaleNotes']).toEqual(expectedScaleNotes);
    });

    it('should create the C Major Pentatonic with the correct scale notes', () => {
      const rootNoteName = 'C';
      const expectedScaleNotes = ['C', 'D', 'E', 'G', 'A', 'C'];

      const scale = new Scale(rootNoteName, ScaleFormulas[PentatonicMajorScale]);

      expect(scale['scaleNotes']).toEqual(expectedScaleNotes);
    });

    it('should create the C Minor Pentatonic with the correct scale notes', () => {
      const rootNoteName = 'C';
      const expectedScaleNotes = ['C', 'D#', 'F', 'G', 'A#', 'C'];

      const scale = new Scale(rootNoteName, ScaleFormulas[PentatonicMinorScale]);

      expect(scale['scaleNotes']).toEqual(expectedScaleNotes);
    });

    it('should create the Chromatic Scale when the scaleFormula is null', () => {
      const rootNoteName = 'C';
      const expectedScaleNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

      const scale = new Scale(rootNoteName, ScaleFormulas[ChromaticScaleName]);

      expect(scale['scaleNotes']).toEqual(expectedScaleNotes);
    });

    it('should throw an error for an invalid root note', () => {
      const rootNoteName = 'Z';

      expect(() => new Scale(rootNoteName, ScaleFormulas[MajorScaleName])).toThrowError(
        'Invalid root note: Z'
      );
    });
  });

  describe('getNoteState', () => {
    let scale: Scale;

    beforeEach(() => {
      const rootNoteName = 'C';
      scale = new Scale(rootNoteName, ScaleFormulas[MajorScaleName]);
    });

    it('should return NoteState.RootNote for the root note', () => {
      const note: Note = new Note('C', 4);

      const noteState = scale.getNoteState(note);

      expect(noteState).toBe(NoteState.RootNote);
    });

    it('should return NoteState.ActiveNote for a note in the scale', () => {
      const note: Note = new Note('E', 4);

      const noteState = scale.getNoteState(note);

      expect(noteState).toBe(NoteState.ActiveNote);
    });

    it('should return NoteState.HiddenNote for a note not in the scale', () => {
      const note: Note = new Note('C#', 4);

      const noteState = scale.getNoteState(note);

      expect(noteState).toBe(NoteState.HiddenNote);
    });
  });
});
