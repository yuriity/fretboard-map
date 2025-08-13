import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {FretboardSettings} from '../../models/fretboard-settings';
import {FretboardToolbarComponent} from './fretboard-toolbar/fretboard-toolbar.component';
import {FretboardComponent} from './fretboard/fretboard.component';

@Component({
  selector: 'fbm-fretboard-card',
  imports: [FretboardToolbarComponent, FretboardComponent],
  templateUrl: './fretboard-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FretboardCardComponent {
  fretboard = input<FretboardSettings>();
}
