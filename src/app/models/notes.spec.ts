import { Note } from './notes';

describe('Note', () => {
  it('should create an instance with name and octave', () => {
    const note = new Note('C', 4);
    expect(note.name).toBe('C');
    expect(note.octave).toBe(4);
  });

  it('should throw an error for an invalid octave number', () => {
    expect(() => new Note('C', 0)).toThrowError('Invalid octave number: 0');
    expect(() => new Note('C', 8)).toThrowError('Invalid octave number: 8');
  });

  it('should throw an error for an invalid note name', () => {
    expect(() => new Note('H', 1)).toThrowError('Invalid note name: H');
    expect(() => new Note('E#', 1)).toThrowError('Invalid note name: E#');
    expect(() => new Note('B#', 1)).toThrowError('Invalid note name: B#');
  });

  it('should return the correct id', () => {
    const note = new Note('C', 4);
    expect(note.id).toBe('C4');
  });

  it('should create a Note from a valid string', () => {
    const noteString = 'C#1';
    const note = Note.fromString(noteString);
    expect(note.name).toBe('C#');
    expect(note.octave).toBe(1);
  });

  it('should throw an error for an invalid string', () => {
    const invalidNoteString = 'H#1';
    expect(() => Note.fromString(invalidNoteString)).toThrowError('Invalid note name: H#1');
  });

  it('should throw an error for a string with invalid format', () => {
    const invalidFormatString = 'C#';
    expect(() => Note.fromString(invalidFormatString)).toThrowError('Invalid note name: C#');
  });
});
