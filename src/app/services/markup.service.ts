import { effect, EffectRef, Injectable } from '@angular/core';

import { Fretboard } from '../models/fretboard';
import { Note } from '../models/notes';
import { Scale } from '../models/scale';
import { ScaleFormulas } from '../models/scale-formulas';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class MarkupService {
  constructor(private settings: SettingsService) {}
}
