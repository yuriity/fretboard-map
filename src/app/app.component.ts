import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SettingsService } from './services/settings.service';

@Component({
  selector: 'fbm-root',
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
  ],
  templateUrl: './app.component.html',
  styles: [
    `
      .main {
        margin-top: 1rem;
      }
      .accordion-headers-align .mat-expansion-panel-header-description {
        justify-content: space-between;
        align-items: center;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Fretboard Map';
  step = signal(0);

  constructor(public settings: SettingsService) {}

  setStep(index: number) {
    this.step.set(index);
  }
}
