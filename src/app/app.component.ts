import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SettingsService } from './services/settings.service';

@Component({
  selector: 'fbm-root',
  imports: [MatToolbarModule, MatIconModule, MatTabsModule],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'Fretboard Map';

  constructor(public settings: SettingsService) {}
}
