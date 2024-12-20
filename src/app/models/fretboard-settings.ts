import { WritableSignal } from '@angular/core';

export interface FretboardSettings {
  id: string;
  title: WritableSignal<string>;
  tuning: WritableSignal<string>;
  rootNote: WritableSignal<string>;
  scale: WritableSignal<string>;
  viewOption: WritableSignal<string>;
  expanded: WritableSignal<boolean>;
}
