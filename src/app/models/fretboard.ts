import { FretClass, GuitarFret } from './guitar-fret';
import { GuitarString } from './guitar-string';
import { ChromaticScale, Note } from './notes';
import { Scale } from './scale';

export class Fretboard {
  readonly strings: GuitarString[];

  constructor(startingNotes: Note[], scale: Scale, freatsAmount = 24) {
    this.strings = [];
    for (const startingNote of startingNotes) {
      const frets = [];
      const startingNoteIndex = ChromaticScale.findIndex(
        note => note.name === startingNote.name && note.octave === startingNote.octave,
      );

      for (let j = 0; j < freatsAmount + 1; j++) {
        let newFret: GuitarFret;

        const note = ChromaticScale[startingNoteIndex + j];
        const noteState = scale.getNoteState(note);
        if (j == 0) {
          newFret = {
            note: note,
            noteState: noteState,
            fretClass: FretClass.Zero,
          };
        } else if (j % 12 == 0) {
          newFret = {
            note: note,
            noteState: noteState,
            fretClass: FretClass.Twelves,
          };
        } else {
          newFret = {
            note: note,
            noteState: noteState,
            fretClass: FretClass.Default,
          };
        }

        frets.push(newFret);
      }

      this.strings.push({id: this.strings.length, frets: frets});
    }
  }

  updateFretboard(scale: Scale) {
    for (const string of this.strings) {
      for (const fret of string.frets) {
        const note = fret.note;
        fret.noteState = scale.getNoteState(note);
      }
    }
  }
}
