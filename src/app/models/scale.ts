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

    const rootNoteIndex = ChromaticScale.findIndex(
      (note) => note.name === rootNoteName
    );
    if (rootNoteIndex === -1) {
      throw new Error(`Invalid root note: ${rootNoteName}`);
    }

    this.scaleNotes = [ChromaticScale[rootNoteIndex].name];
    let noteIndex = rootNoteIndex;

    for (const interval of this.scaleIntervals) {
      noteIndex = (noteIndex + interval) % 12;
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
