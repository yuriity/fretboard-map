import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ChromaticScale } from '../../../models/notes';
import { FretboardSettings } from '../../../models/fretboard-settings';
import { ScaleFormulas } from '../../../models/scale-formulas';

@Component({
  selector: 'fbm-fretboard-toolbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './fretboard-toolbar.component.html',
  styles: `
    .controls-container {
      display: flex;
      flex-direction: row;
      gap: 16px;
      padding: 8px 0;
      align-items: center;
    }

    mat-form-field {
      min-width: 120px;
    }

    @media (max-width: 480px) {
      .controls-container {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `,
})
export class FretboardToolbarComponent {
  fretboard = input.required<FretboardSettings>();

  readonly notes = ChromaticScale.slice(0, 12);
  readonly scaleNames = Object.keys(ScaleFormulas);

  onNoteSelected(noteName: string) {
    this.fretboard().rootNote.set(noteName);
  }

  onScaleSelected(scale: string) {
    this.fretboard().scale.set(scale);
  }
}
