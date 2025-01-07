import { FretClass, GuitarFret } from './guitar-fret';
import { GuitarString } from './guitar-string';
import { ChromaticScale, Note } from './notes';
import { Scale } from './scale';

export class Fretboard {
  readonly strings: GuitarString[];

  constructor(startingNotes: Note[], scale: Scale, freatsAmount = 24) {
    this.strings = new Array();
    for (let i = 0; i < startingNotes.length; i++) {
      const frets = new Array();
      const startingNoteIndex = ChromaticScale.findIndex(
        (note) =>
          note.name === startingNotes[i].name &&
          note.octave === startingNotes[i].octave
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

      this.strings.push({ frets: frets });
    }
  }

  updateFretboard(scale: Scale) {
    for (let i = 0; i < this.strings.length; i++) {
      for (let j = 0; j < this.strings[i].frets.length; j++) {
        const note = this.strings[i].frets[j].note;
        this.strings[i].frets[j].noteState = scale.getNoteState(note);
      }
    }
  }
}
