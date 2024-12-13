export class Note {
  constructor(public readonly name: string, public readonly octave: number) {
    this.name = name.toUpperCase(); // Ensure the name is stored in uppercase

    if (!NoteNames.has(this.name)) {
      throw new Error(`Invalid note name: ${name}`);
    }

    if (octave <= 0 || octave > 7) {
      throw new Error(`Invalid octave number: ${octave}`);
    }
  }

  get id(): string {
    return this.name + this.octave;
  }

  static fromString(noteString: string): Note {
    const match = noteString.match(/^([A-G]#?)(\d)$/);
    if (!match) {
      throw new Error(`Invalid note name: ${noteString}`);
    }
    const [, name, octave] = match;
    return new Note(name, parseInt(octave, 10));
  }
}

export const NoteNames = new Set(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']);

export const ChromaticScale: Note[] = [
  new Note('C', 1),
  new Note('C#', 1),
  new Note('D', 1),
  new Note('D#', 1),
  new Note('E', 1),
  new Note('F', 1),
  new Note('F#', 1),
  new Note('G', 1),
  new Note('G#', 1),
  new Note('A', 1),
  new Note('A#', 1),
  new Note('B', 1),

  new Note('C', 2),
  new Note('C#', 2),
  new Note('D', 2),
  new Note('D#', 2),
  new Note('E', 2),
  new Note('F', 2),
  new Note('F#', 2),
  new Note('G', 2),
  new Note('G#', 2),
  new Note('A', 2),
  new Note('A#', 2),
  new Note('B', 2),

  new Note('C', 3),
  new Note('C#', 3),
  new Note('D', 3),
  new Note('D#', 3),
  new Note('E', 3),
  new Note('F', 3),
  new Note('F#', 3),
  new Note('G', 3),
  new Note('G#', 3),
  new Note('A', 3),
  new Note('A#', 3),
  new Note('B', 3),

  new Note('C', 4),
  new Note('C#', 4),
  new Note('D', 4),
  new Note('D#', 4),
  new Note('E', 4),
  new Note('F', 4),
  new Note('F#', 4),
  new Note('G', 4),
  new Note('G#', 4),
  new Note('A', 4),
  new Note('A#', 4),
  new Note('B', 4),

  new Note('C', 5),
  new Note('C#', 5),
  new Note('D', 5),
  new Note('D#', 5),
  new Note('E', 5),
  new Note('F', 5),
  new Note('F#', 5),
  new Note('G', 5),
  new Note('G#', 5),
  new Note('A', 5),
  new Note('A#', 5),
  new Note('B', 5),

  new Note('C', 6),
  new Note('C#', 6),
  new Note('D', 6),
  new Note('D#', 6),
  new Note('E', 6),
  new Note('F', 6),
  new Note('F#', 6),
  new Note('G', 6),
  new Note('G#', 6),
  new Note('A', 6),
  new Note('A#', 6),
  new Note('B', 6),

  new Note('C', 7),
  new Note('C#', 7),
  new Note('D', 7),
  new Note('D#', 7),
  new Note('E', 7),
  new Note('F', 7),
  new Note('F#', 7),
  new Note('G', 7),
  new Note('G#', 7),
  new Note('A', 7),
  new Note('A#', 7),
  new Note('B', 7),
];
