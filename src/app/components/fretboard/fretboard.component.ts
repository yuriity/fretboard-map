import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { GuitarFretComponent } from './guitar-fret/guitar-fret.component';
import { ViewOptions } from '../../models/view-options';
import { Fretboard } from '../../models/fretboard';

@Component({
  selector: 'fbm-fretboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, GuitarFretComponent],
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss'],
})
export class FretboardComponent {
  readonly allViewOptions = ViewOptions;
  @Input() viewOption: string = Object.values(ViewOptions)[0];
  @Input() fretboard: Fretboard | null = null;

  constructor() {}
}
