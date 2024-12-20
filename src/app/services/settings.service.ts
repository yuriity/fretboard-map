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

/**
 * Interface representing the settings for a fretboard.
 */
export interface FretboardSettings {
  /**
   * The title of the fretboard. Changing this will not update settings in local storage.
   * Use `renameFretboard` instead.
   */
  title: WritableSignal<string>;

  /**
   * The tuning of the fretboard.
   */
  tuning: WritableSignal<string>;

  /**
   * The root note of the fretboard.
   */
  rootNote: WritableSignal<string>;

  /**
   * The scale of the fretboard.
   */
  scale: WritableSignal<string>;

  /**
   * The view option for the fretboard.
   */
  viewOption: WritableSignal<string>;

  /**
   * Indicates whether the fretboard is expanded.
   */
  expanded: WritableSignal<boolean>;
}

interface AppSettings {
  fretboards: {
    title: string;
    tuning: string;
    rootNote: string;
    scale: string;
    viewOption: string;
    expanded: boolean;
  }[];
}

type EffectRefDictionary = { [key: string]: EffectRef };

const SETTINGS = 'settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private effects: EffectRefDictionary = {};
  private defaultRootNote = ChromaticScale[0].name;
  private defaultScale = Object.keys(ScaleFormulas)[0];
  private defaultFretboardViewOption = Object.values(ViewOptions)[0];
  private defaultTuning = 'E4,B3,G3,D3,A2,E2';
  private defaultSettings: AppSettings = {
    fretboards: [
      {
        title: 'Standard E',
        tuning: this.defaultTuning,
        rootNote: this.defaultRootNote,
        scale: this.defaultScale,
        viewOption: this.defaultFretboardViewOption,
        expanded: true,
      },
      {
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
    title: string,
    tuning: string,
    rootNote: string,
    scale: string,
    viewOption: string,
    expanded: boolean
  ): void {
    if (!title || !tuning || !rootNote || !scale || !viewOption) {
      throw new Error('All fretboard fields are required');
    }

    if (
      this.fretboards().some(
        (fretboard: FretboardSettings) => fretboard.title() === title
      )
    ) {
      throw new Error('Fretboard title must be unique');
    }

    const newFretboard = {
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
      (onCleanup) => {
        newFretboard.title();
        newFretboard.tuning();
        newFretboard.rootNote();
        newFretboard.scale();
        newFretboard.viewOption();
        newFretboard.expanded();
        this.saveSettings();

        onCleanup(() => {
          console.log('Effect cleanup ' + newFretboard.title);
        });
      },
      { injector: this.injector }
    );

    this.effects[title] = effectRef;
  }

  renameFretboard(oldTitle: string, newTitle: string): void {
    if (!newTitle) {
      throw new Error('Fretboard title is required');
    }

    if (
      this.fretboards().some(
        (fretboard: FretboardSettings) => fretboard.title() === newTitle
      )
    ) {
      throw new Error('Fretboard title must be unique');
    }

    this.fretboards.update((fretboards) =>
      fretboards.map((fretboard) => {
        if (fretboard.title() === oldTitle) {
          fretboard.title.set(newTitle);
        }
        return fretboard;
      })
    );
    this.effects[newTitle] = this.effects[oldTitle];
    delete this.effects[oldTitle];
  }

  removeFretboard(title: string): void {
    this.fretboards.update((fretboards) =>
      fretboards.filter((fretboard) => fretboard.title() !== title)
    );
    this.effects[title].destroy();
    delete this.effects[title];
  }

  saveSettings(): void {
    this.saveSettingsToLocalStorage({
      fretboards: this.fretboards().map((fretboard) => ({
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
