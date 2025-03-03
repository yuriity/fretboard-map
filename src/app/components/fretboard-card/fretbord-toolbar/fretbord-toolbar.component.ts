import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ChromaticScale } from '../../../models/notes';
import { FretboardSettings } from '../../../models/fretboard-settings';

@Component({
  selector: 'fbm-fretbord-toolbar',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './fretbord-toolbar.component.html',
  styles: `
    .mat-toolbar-row, .mat-toolbar-single-row {
      padding: 0;
  }`,
})
export class FretbordToolbarComponent {
  fretboard = input.required<FretboardSettings>();

  readonly notes = ChromaticScale.slice(0, 12);

  onNoteSelected(noteName: string) {
    this.fretboard().rootNote.set(noteName);
  }
}
