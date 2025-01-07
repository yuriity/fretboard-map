import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SettingsService } from './services/settings.service';
import { FretboardsAccordionComponent } from './components/fretboards-accordion/fretboards-accordion.component';
import { AddFretboardDialogComponent } from './components/dialogs/add-fretboard-dialog.component';

@Component({
  selector: 'fbm-root',
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    FretboardsAccordionComponent,
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
  private readonly dialog = inject(MatDialog);

  constructor(public settings: SettingsService) {}

  onAddFretboardClick(): void {
    const dialogRef = this.dialog.open(AddFretboardDialogComponent, {
      data: {
        newTitle: 'Fretboard ' + (this.settings.fretboards().length + 1),
        usedTitles: this.settings.fretboards().map((board) => board.title()),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.settings.addFretboard(
          (this.settings.fretboards().length + 1).toString(),
          result.title,
          this.settings.defaultTuning,
          result.rootNoteName,
          result.scale,
          this.settings.defaultFretboardViewOption,
          true
        );
      }
    });
  }
}
