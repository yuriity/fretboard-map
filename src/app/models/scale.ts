import { NoteState } from './guitar-fret';
import { ChromaticScale, Note } from './notes';

export class Scale {
  private readonly scaleNotes: string[] = [];

  constructor(readonly rootNoteName: string, readonly scaleIntervals: number[] | null) {
    if (this.scaleIntervals === null) {
      rootNoteName = '';
      this.scaleNotes = ChromaticScale.slice(0, 12).map((note) => note.name);

      return;
    }

    let rootNoteIndex = -1;
    for (let i = 0; i < 12; i++) {
      if (ChromaticScale[i].name === rootNoteName) {
        rootNoteIndex = i;
        break;
      }
    }

    if (rootNoteIndex == -1) {
      throw new Error(`Invalid root note: ${rootNoteName}`);
    }

    let noteIndex = rootNoteIndex;
    this.scaleNotes.push(ChromaticScale[noteIndex].name);
    for (let i = 0; i < this.scaleIntervals.length; i++) {
      noteIndex += this.scaleIntervals[i];
      this.scaleNotes.push(ChromaticScale[noteIndex].name);
    }
  }

  getNoteState(note: Note): NoteState {
    if (note.name === this.rootNoteName) {
      return NoteState.RootNote;
    }

    if (this.scaleNotes.includes(note.name)) {
      return NoteState.ActiveNote;
    }

    return NoteState.HiddenNote;
  }
}
