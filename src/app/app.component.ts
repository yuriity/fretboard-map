import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SettingsService } from './services/settings.service';
import { FretboardsComponent } from './components/fretboards/fretboards.component';

@Component({
  selector: 'fbm-root',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    FretboardsComponent,
  ],
  templateUrl: './app.component.html',
  styles: `
    mat-toolbar {
      color: var(--mat-sys-primary);
      background: var(--mat-sys-primary-container);

      button {
        color: inherit;
      }
    }
    .main {
      margin-top: 1rem;
    }
  `,
})
export class AppComponent {
  title = 'Fretboard Map';

  constructor(public settings: SettingsService) {}
}
