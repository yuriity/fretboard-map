import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { GuitarFret } from '../../../../models/guitar-fret';

@Component({
  selector: 'fbm-guitar-fret',
  imports: [CommonModule],
  templateUrl: './guitar-fret.component.html',
  styleUrls: ['./guitar-fret.component.scss'],
})
export class GuitarFretComponent {
  readonly fret = input.required<GuitarFret>();
}
