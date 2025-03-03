import { Component, input } from '@angular/core';

import { FretboardSettings } from '../../models/fretboard-settings';
import { FretbordToolbarComponent } from './fretbord-toolbar/fretbord-toolbar.component';

@Component({
  selector: 'fbm-fretboard-card',
  imports: [FretbordToolbarComponent],
  templateUrl: './fretboard-card.component.html',
  styles: ``,
})
export class FretboardCardComponent {
  fretboard = input<FretboardSettings>();
}
