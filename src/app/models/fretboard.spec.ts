import { Fretboard } from './fretboard';
import { NoteState, FretClass } from './guitar-fret';
import { Note } from './notes';
import { Scale } from './scale';
import { ScaleFormulas } from './scale-formulas';

const ChromaticScale = new Scale('', ScaleFormulas['Chromatic Scale']);

describe('Fretboard', () => {
  describe('constructor', () => {
    it('should create proper zero frets state', () => {
      const startingNotes = [new Note('E', 4), new Note('B', 3), new Note('G', 3)];
      const actual = new Fretboard(startingNotes, ChromaticScale);

      expect(actual.strings[0].frets[0].fretClass).toBe(FretClass.Zero);
      expect(actual.strings[1].frets[0].fretClass).toBe(FretClass.Zero);
      expect(actual.strings[2].frets[0].fretClass).toBe(FretClass.Zero);
    });

    it('should create proper twelves frets state', () => {
      const startingNotes: Note[] = [new Note('E', 4), new Note('B', 3), new Note('G', 3)];
      const actual = new Fretboard(startingNotes, ChromaticScale);

      expect(actual.strings[0].frets[12].fretClass).toBe(FretClass.Twelves);
      expect(actual.strings[1].frets[12].fretClass).toBe(FretClass.Twelves);
      expect(actual.strings[2].frets[12].fretClass).toBe(FretClass.Twelves);
      expect(actual.strings[0].frets[24].fretClass).toBe(FretClass.Twelves);
      expect(actual.strings[1].frets[24].fretClass).toBe(FretClass.Twelves);
      expect(actual.strings[2].frets[24].fretClass).toBe(FretClass.Twelves);
    });

    it('should create proper default frets state', () => {
      const startingNotes = [new Note('E', 4), new Note('B', 3), new Note('G', 3)];
      const actual = new Fretboard(startingNotes, ChromaticScale);

      for (let i = 1; i < 12; i++) {
        expect(actual.strings[0].frets[i].fretClass).toBe(FretClass.Default);
        expect(actual.strings[1].frets[i].fretClass).toBe(FretClass.Default);
        expect(actual.strings[2].frets[i].fretClass).toBe(FretClass.Default);
      }

      for (let i = 13; i < 24; i++) {
        expect(actual.strings[0].frets[i].fretClass).toBe(FretClass.Default);
        expect(actual.strings[1].frets[i].fretClass).toBe(FretClass.Default);
        expect(actual.strings[2].frets[i].fretClass).toBe(FretClass.Default);
      }
    });

    it('should create proper amount of strings', () => {
      const startingNotes: Note[] = [new Note('E', 4), new Note('B', 3), new Note('G', 3)];
      const actual = new Fretboard(startingNotes, ChromaticScale);

      expect(actual.strings.length).toBe(3);
    });

    it('should create proper amount of frets', () => {
      const startingNotes: Note[] = [new Note('E', 4), new Note('B', 3), new Note('G', 3)];
      const expectedAmountOfFrets = 5;
      const actual = new Fretboard(startingNotes, ChromaticScale, expectedAmountOfFrets);

      expect(actual.strings[0].frets.length).toBe(expectedAmountOfFrets + 1);
      expect(actual.strings[1].frets.length).toBe(expectedAmountOfFrets + 1);
      expect(actual.strings[2].frets.length).toBe(expectedAmountOfFrets + 1);
    });

    it('should create proper amount of frets, default amount is 24 plus zero fret', () => {
      const startingNotes: Note[] = [new Note('E', 4), new Note('B', 3), new Note('G', 3)];
      const expectedAmountOfFrets = 24 + 1;
      const actual = new Fretboard(startingNotes, ChromaticScale);

      expect(actual.strings[0].frets.length).toBe(expectedAmountOfFrets);
      expect(actual.strings[1].frets.length).toBe(expectedAmountOfFrets);
      expect(actual.strings[2].frets.length).toBe(expectedAmountOfFrets);
    });

    it('should create proper frets', () => {
      const startingNotes: Note[] = [new Note('E', 4), new Note('B', 3), new Note('G', 3)];
      const actual = new Fretboard(startingNotes, ChromaticScale);

      expect(actual.strings[0].frets[0].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[0].note.name).toBe('E');
      expect(actual.strings[0].frets[0].note.octave).toBe(4);
      expect(actual.strings[0].frets[0].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[10].note.name).toBe('D');
      expect(actual.strings[0].frets[10].note.octave).toBe(5);
      expect(actual.strings[0].frets[24].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[24].note.name).toBe('E');
      expect(actual.strings[0].frets[24].note.octave).toBe(6);

      expect(actual.strings[2].frets[0].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[2].frets[0].note.name).toBe('G');
      expect(actual.strings[2].frets[0].note.octave).toBe(3);
      expect(actual.strings[2].frets[0].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[2].frets[10].note.name).toBe('F');
      expect(actual.strings[2].frets[10].note.octave).toBe(4);
      expect(actual.strings[2].frets[24].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[2].frets[24].note.name).toBe('G');
      expect(actual.strings[2].frets[24].note.octave).toBe(5);
    });

    it('should create proper frets for E Minor scale', () => {
      const startingNotes = [new Note('E', 4)];
      const actual = new Fretboard(startingNotes, new Scale('E', ScaleFormulas['Minor Scale']), 12);

      expect(actual.strings[0].frets[0].note.name).toBe('E');
      expect(actual.strings[0].frets[0].noteState).toBe(NoteState.RootNote);
      expect(actual.strings[0].frets[1].note.name).toBe('F');
      expect(actual.strings[0].frets[1].noteState).toBe(NoteState.HiddenNote);
      expect(actual.strings[0].frets[2].note.name).toBe('F#');
      expect(actual.strings[0].frets[2].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[3].note.name).toBe('G');
      expect(actual.strings[0].frets[3].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[4].note.name).toBe('G#');
      expect(actual.strings[0].frets[4].noteState).toBe(NoteState.HiddenNote);
      expect(actual.strings[0].frets[5].note.name).toBe('A');
      expect(actual.strings[0].frets[5].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[6].note.name).toBe('A#');
      expect(actual.strings[0].frets[6].noteState).toBe(NoteState.HiddenNote);
      expect(actual.strings[0].frets[7].note.name).toBe('B');
      expect(actual.strings[0].frets[7].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[8].note.name).toBe('C');
      expect(actual.strings[0].frets[8].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[9].note.name).toBe('C#');
      expect(actual.strings[0].frets[9].noteState).toBe(NoteState.HiddenNote);
      expect(actual.strings[0].frets[10].note.name).toBe('D');
      expect(actual.strings[0].frets[10].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[11].note.name).toBe('D#');
      expect(actual.strings[0].frets[11].noteState).toBe(NoteState.HiddenNote);
    });
  });

  describe('updateFretboard', () => {
    it('should update frets state', () => {
      const startingNotes = [new Note('E', 4)];
      const actual = new Fretboard(
        startingNotes,
        new Scale('', ScaleFormulas['Chromatic Scale']),
        12
      );

      actual.updateFretboard(new Scale('E', ScaleFormulas['Minor Scale']));

      expect(actual.strings[0].frets[0].note.name).toBe('E');
      expect(actual.strings[0].frets[0].noteState).toBe(NoteState.RootNote);
      expect(actual.strings[0].frets[1].note.name).toBe('F');
      expect(actual.strings[0].frets[1].noteState).toBe(NoteState.HiddenNote);
      expect(actual.strings[0].frets[2].note.name).toBe('F#');
      expect(actual.strings[0].frets[2].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[3].note.name).toBe('G');
      expect(actual.strings[0].frets[3].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[4].note.name).toBe('G#');
      expect(actual.strings[0].frets[4].noteState).toBe(NoteState.HiddenNote);
      expect(actual.strings[0].frets[5].note.name).toBe('A');
      expect(actual.strings[0].frets[5].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[6].note.name).toBe('A#');
      expect(actual.strings[0].frets[6].noteState).toBe(NoteState.HiddenNote);
      expect(actual.strings[0].frets[7].note.name).toBe('B');
      expect(actual.strings[0].frets[7].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[8].note.name).toBe('C');
      expect(actual.strings[0].frets[8].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[9].note.name).toBe('C#');
      expect(actual.strings[0].frets[9].noteState).toBe(NoteState.HiddenNote);
      expect(actual.strings[0].frets[10].note.name).toBe('D');
      expect(actual.strings[0].frets[10].noteState).toBe(NoteState.ActiveNote);
      expect(actual.strings[0].frets[11].note.name).toBe('D#');
      expect(actual.strings[0].frets[11].noteState).toBe(NoteState.HiddenNote);
    });
  });
});
