import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { ChromaticScale } from '../models/notes';
import { ScaleFormulas } from '../models/scale-formulas';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default settings', () => {
    expect(service.fretboards().length).toBe(2);
    expect(service.fretboards()[0].title()).toBe('Standard E');
    expect(service.fretboards()[0].rootNote()).toBe('C');
    expect(service.fretboards()[0].scale()).toBe('Chromatic Scale');
    expect(service.fretboards()[0].tuning()).toBe('E4,B3,G3,D3,A2,E2');
    expect(service.fretboards()[0].viewOption()).toBe('24 frets');
    expect(service.fretboards()[0].expanded()).toBe(true);
  });

  it('should save updated settings into local storage', () => {
    const newTitle = 'Standard E (Updated)';
    const newRootNote = 'F#';
    const newScale = 'Major Scale';
    const newTuning = 'E4,E4';
    const newViewOption = '12 frets';
    const newExpanded = false;

    service.fretboards()[0].title.set(newTitle);
    service.fretboards()[0].rootNote.set(newRootNote);
    service.fretboards()[0].scale.set(newScale);
    service.fretboards()[0].tuning.set(newTuning);
    service.fretboards()[0].viewOption.set(newViewOption);
    service.fretboards()[0].expanded.set(newExpanded);
    TestBed.flushEffects();

    const savedSettings = JSON.parse(localStorage.getItem('settings')!);

    expect(service.fretboards()[0].title()).toBe(newTitle);
    expect(savedSettings.fretboards[0].title).toBe(newTitle);

    expect(service.fretboards()[0].rootNote()).toBe(newRootNote);
    expect(savedSettings.fretboards[0].rootNote).toBe(newRootNote);

    expect(service.fretboards()[0].scale()).toBe(newScale);
    expect(savedSettings.fretboards[0].scale).toBe(newScale);

    expect(service.fretboards()[0].tuning()).toBe(newTuning);
    expect(savedSettings.fretboards[0].tuning).toBe(newTuning);

    expect(service.fretboards()[0].viewOption()).toBe(newViewOption);
    expect(savedSettings.fretboards[0].viewOption).toBe(newViewOption);

    expect(service.fretboards()[0].expanded()).toBe(newExpanded);
    expect(savedSettings.fretboards[0].expanded).toBe(newExpanded);
  });

  it('should add a new fretboard', () => {
    service.addFretboard(
      '3',
      'Fretboard 2',
      'E4,B3,G3,D3,A2,E2',
      ChromaticScale[0].name,
      Object.keys(ScaleFormulas)[0],
      '24 frets',
      true
    );
    expect(service.fretboards().length).toBe(3);
    expect(service.fretboards()[2].title()).toBe('Fretboard 2');
    expect(service.fretboards()[2].viewOption()).toBe('24 frets');
    expect(service.fretboards()[2].expanded()).toBe(true);
  });

  it('should not add a fretboard with missing fields', () => {
    expect(() =>
      service.addFretboard(
        '3',
        '',
        'E4,B3,G3,D3,A2,E2',
        ChromaticScale[0].name,
        Object.keys(ScaleFormulas)[0],
        '24 frets',
        false
      )
    ).toThrowError('All fretboard fields are required');
  });

  it('should not add a fretboard with a duplicate title', () => {
    service.addFretboard(
      '3',
      'Fretboard 2',
      'E4,B3,G3,D3,A2,E2',
      ChromaticScale[0].name,
      Object.keys(ScaleFormulas)[0],
      '24 frets',
      false
    );
    expect(() =>
      service.addFretboard(
        '4',
        'Fretboard 2',
        'E4,B3,G3,D3,A2,E2',
        ChromaticScale[0].name,
        Object.keys(ScaleFormulas)[0],
        '24 frets',
        false
      )
    ).toThrowError('Fretboard title must be unique');
  });

  it('should remove a fretboard', () => {
    service.addFretboard(
      '3',
      'Fretboard 2',
      'E4,B3,G3,D3,A2,E2',
      ChromaticScale[0].name,
      Object.keys(ScaleFormulas)[0],
      '24 frets',
      false
    );
    service.removeFretboard('3');
    expect(service.fretboards().length).toBe(2);
  });

  it('should save settings to localStorage', () => {
    service.addFretboard(
      '3',
      'Fretboard 2',
      'E4,B3,G3,D3,A2,E2',
      ChromaticScale[0].name,
      Object.keys(ScaleFormulas)[0],
      '24 frets',
      false
    );
    service.saveSettings();
    const savedSettings = JSON.parse(localStorage.getItem('settings')!);
    expect(savedSettings.fretboards.length).toBe(3);
    expect(savedSettings.fretboards[2].title).toBe('Fretboard 2');
    expect(savedSettings.fretboards[2].viewOption).toBe('24 frets');
    expect(savedSettings.fretboards[2].expanded).toBe(false);
  });

  it('should load settings from localStorage', () => {
    const mockSettings = {
      fretboards: [
        {
          id: '3',
          title: 'Fretboard 2',
          tuning: 'E4,B3,G3,D3,A2,D2',
          rootNote: 'D',
          scale: 'Minor Scale',
          viewOption: '12 frets',
          expanded: false,
        },
      ],
    };
    localStorage.setItem('settings', JSON.stringify(mockSettings));

    // Re-initialize service to load from local storage
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [SettingsService],
    });
    service = TestBed.inject(SettingsService);

    expect(service.fretboards().length).toBe(1);
    expect(service.fretboards()[0].title()).toBe('Fretboard 2');
    expect(service.fretboards()[0].rootNote()).toBe('D');
    expect(service.fretboards()[0].scale()).toBe('Minor Scale');
    expect(service.fretboards()[0].tuning()).toBe('E4,B3,G3,D3,A2,D2');
    expect(service.fretboards()[0].viewOption()).toBe('12 frets');
    expect(service.fretboards()[0].expanded()).toBe(false);
  });
});
