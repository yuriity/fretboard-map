import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { GuitarFretComponent } from './guitar-fret/guitar-fret.component';
import { ViewOptions } from '../../../models/view-options';
import { FretboardSettings } from '../../../models/fretboard-settings';
import { Fretboard } from '../../../models/fretboard';
import { ScaleFormulas } from '../../../models/scale-formulas';
import { Note } from '../../../models/notes';
import { Scale } from '../../../models/scale';

@Component({
  selector: 'fbm-fretboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, GuitarFretComponent],
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FretboardComponent {
  readonly allViewOptions = ViewOptions;
  fretboardSettings = input.required<FretboardSettings>();
  fretboard = computed(
    () =>
      new Fretboard(
        this.fretboardSettings()
          .tuning()
          .split(',')
          .map((note) => Note.fromString(note)),
        new Scale(
          this.fretboardSettings().rootNote(),
          ScaleFormulas[this.fretboardSettings().scale()]
        )
      )
  );
}
