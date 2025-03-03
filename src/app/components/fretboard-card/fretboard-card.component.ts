import { Component, input } from '@angular/core';

import { FretboardSettings } from '../../models/fretboard-settings';
import { FretbordToolbarComponent } from './fretbord-toolbar/fretbord-toolbar.component';
import { FretboardComponent } from './fretboard/fretboard.component';

@Component({
  selector: 'fbm-fretboard-card',
  imports: [FretbordToolbarComponent, FretboardComponent],
  templateUrl: './fretboard-card.component.html',
  styles: ``,
})
export class FretboardCardComponent {
  fretboard = input<FretboardSettings>();
}
