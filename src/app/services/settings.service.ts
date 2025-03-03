import {
  effect,
  EffectRef,
  Injectable,
  Injector,
  signal,
  WritableSignal,
} from '@angular/core';

import { ChromaticScale } from '../models/notes';
import { ScaleFormulas } from '../models/scale-formulas';
import { ViewOptions } from '../models/view-options';
import { FretboardSettings } from '../models/fretboard-settings';

interface AppSettings {
  fretboards: {
    id: string;
    title: string;
    tuning: string;
    rootNote: string;
    scale: string;
    viewOption: string;
    expanded: boolean;
  }[];
}

const SETTINGS = 'settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  readonly defaultRootNote = ChromaticScale[0].name;
  readonly defaultScale = Object.keys(ScaleFormulas)[0];
  readonly defaultFretboardViewOption = Object.values(ViewOptions)[0];
  readonly defaultTuning = 'E4,B3,G3,D3,A2,E2';
  private effects = new Map<string, EffectRef>();
  private defaultSettings: AppSettings = {
    fretboards: [
      {
        id: '1',
        title: 'Standard E',
        tuning: this.defaultTuning,
        rootNote: this.defaultRootNote,
        scale: this.defaultScale,
        viewOption: this.defaultFretboardViewOption,
        expanded: true,
      },
      {
        id: '2',
        title: 'Drop D',
        tuning: 'E4,B3,G3,D3,A2,D2',
        rootNote: 'D',
        scale: 'Minor Scale',
        viewOption: this.defaultFretboardViewOption,
        expanded: true,
      },
    ],
  };

  fretboards: WritableSignal<FretboardSettings[]>;

  constructor(private injector: Injector) {
    const appSettings = this.getSettingsFromLocalStorage();

    this.fretboards = signal([]);

    appSettings.fretboards.forEach((fretboard) => {
      this.addFretboard(
        fretboard.id,
        fretboard.title,
        fretboard.tuning,
        fretboard.rootNote,
        fretboard.scale,
        fretboard.viewOption,
        fretboard.expanded
      );
    });
  }

  addFretboard(
    id: string,
    title: string,
    tuning: string,
    rootNote: string,
    scale: string,
    viewOption: string,
    expanded: boolean
  ): void {
    if (!id || !title || !tuning || !rootNote || !scale || !viewOption) {
      throw new Error('All fretboard fields are required');
    }

    if (
      this.fretboards().some(
        (fretboard: FretboardSettings) => fretboard.id === id
      )
    ) {
      throw new Error('Fretboard ID must be unique');
    }

    if (
      this.fretboards().some(
        (fretboard: FretboardSettings) => fretboard.title() === title
      )
    ) {
      throw new Error('Fretboard title must be unique');
    }

    const newFretboard = {
      id,
      title: signal(title),
      tuning: signal(tuning),
      rootNote: signal(rootNote),
      scale: signal(scale),
      viewOption: signal(viewOption),
      expanded: signal(expanded),
    };

    this.fretboards.update((fretboards) => [...fretboards, newFretboard]);

    // Effect to save settings when new fretboard properties are updated
    const effectRef = effect(
      () => {
        newFretboard.title();
        newFretboard.tuning();
        newFretboard.rootNote();
        newFretboard.scale();
        newFretboard.viewOption();
        newFretboard.expanded();
        this.saveSettings();
      },
      { injector: this.injector }
    );

    this.effects.set(id, effectRef);
  }

  removeFretboard(id: string): void {
    this.fretboards.update((fretboards) =>
      fretboards.filter((fretboard) => fretboard.id !== id)
    );
    this.effects.get(id)?.destroy();
    this.effects.delete(id);
  }

  saveSettings(): void {
    console.log('Saving settings');
    this.saveSettingsToLocalStorage({
      fretboards: this.fretboards().map((fretboard) => ({
        id: fretboard.id,
        title: fretboard.title(),
        tuning: fretboard.tuning(),
        rootNote: fretboard.rootNote(),
        scale: fretboard.scale(),
        viewOption: fretboard.viewOption(),
        expanded: fretboard.expanded(),
      })),
    });
  }

  private getSettingsFromLocalStorage(): AppSettings {
    const settings = localStorage.getItem(SETTINGS);
    if (settings) {
      const appSettings: AppSettings = JSON.parse(settings);
      if (appSettings.fretboards && appSettings.fretboards.length) {
        return appSettings;
      }
    }

    this.saveSettingsToLocalStorage(this.defaultSettings);
    return this.defaultSettings;
  }

  private saveSettingsToLocalStorage(settings: AppSettings): void {
    localStorage.setItem(SETTINGS, JSON.stringify(settings));
  }
}
