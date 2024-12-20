import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'fbm-fretboards',
  imports: [MatButtonModule, MatExpansionModule, MatIconModule],
  templateUrl: './fretboards.component.html',
  styles: `
    .accordion-headers-align .mat-expansion-panel-header-description {
          justify-content: space-between;
          align-items: center;
        }
  `,
})
export class FretboardsComponent {
  constructor(public settings: SettingsService) {}
}
