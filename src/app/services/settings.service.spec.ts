import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { ChromaticScale } from '../models/notes';
import { ScaleFormulas } from '../models/scale-formulas';
import { ViewOptions } from '../models/view-options';

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
  });

  it('should add a new fretboard', () => {
    service.addFretboard(
      'Fretboard 2',
      'E4,B3,G3,D3,A2,E2',
      ChromaticScale[0].name,
      Object.keys(ScaleFormulas)[0],
      '24 frets'
    );
    expect(service.fretboards().length).toBe(3);
    expect(service.fretboards()[2].title()).toBe('Fretboard 2');
    expect(service.fretboards()[2].viewOption()).toBe('24 frets');
  });

  it('should not add a fretboard with missing fields', () => {
    expect(() =>
      service.addFretboard(
        '',
        'E4,B3,G3,D3,A2,E2',
        ChromaticScale[0].name,
        Object.keys(ScaleFormulas)[0],
        '24 frets'
      )
    ).toThrowError('All fretboard fields are required');
  });

  it('should not add a fretboard with a duplicate title', () => {
    service.addFretboard(
      'Fretboard 2',
      'E4,B3,G3,D3,A2,E2',
      ChromaticScale[0].name,
      Object.keys(ScaleFormulas)[0],
      '24 frets'
    );
    expect(() =>
      service.addFretboard(
        'Fretboard 2',
        'E4,B3,G3,D3,A2,E2',
        ChromaticScale[0].name,
        Object.keys(ScaleFormulas)[0],
        '24 frets'
      )
    ).toThrowError('Fretboard title must be unique');
  });

  it('should remove a fretboard', () => {
    service.addFretboard(
      'Fretboard 2',
      'E4,B3,G3,D3,A2,E2',
      ChromaticScale[0].name,
      Object.keys(ScaleFormulas)[0],
      '24 frets'
    );
    service.removeFretboard('Fretboard 2');
    expect(service.fretboards().length).toBe(2);
  });

  it('should save settings to localStorage', () => {
    service.addFretboard(
      'Fretboard 2',
      'E4,B3,G3,D3,A2,E2',
      ChromaticScale[0].name,
      Object.keys(ScaleFormulas)[0],
      '24 frets'
    );
    service.saveSettings();
    const savedSettings = JSON.parse(localStorage.getItem('settings')!);
    expect(savedSettings.fretboards.length).toBe(3);
    expect(savedSettings.fretboards[2].title).toBe('Fretboard 2');
    expect(savedSettings.fretboards[2].viewOption).toBe('24 frets');
  });

  it('should load settings from localStorage', () => {
    const mockSettings = {
      fretboards: [
        {
          title: 'Fretboard 2',
          tuning: 'E4,B3,G3,D3,A2,D2',
          rootNote: 'D',
          scale: 'Minor Scale',
          viewOption: '12 frets',
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
  });
});
