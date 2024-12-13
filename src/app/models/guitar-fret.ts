import { Note } from './notes';

export interface GuitarFret {
  readonly note: Note;
  readonly fretClass: FretClass;
  noteState: NoteState;
}

export enum FretClass {
  Zero = 'zero',
  Default = 'default',
  Twelves = 'twelves',
}

export enum NoteState {
  ActiveNote = 'active-note',
  RootNote = 'root-note',
  HiddenNote = 'hidden-note',
}
