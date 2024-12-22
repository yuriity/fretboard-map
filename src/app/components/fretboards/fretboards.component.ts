import { Component, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { SettingsService } from '../../services/settings.service';
import { RenameFretboardDialogComponent } from '../dialogs/rename-fretboard-dialog.component';
import { FretboardSettings } from '../../models/fretboard-settings';

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
  readonly dialog = inject(MatDialog);

  constructor(public settings: SettingsService) {}

  openRenameFretboardDialog(fretboard: FretboardSettings): void {
    const dialogRef = this.dialog.open(RenameFretboardDialogComponent, {
      data: {
        newTitle: fretboard.title(),
        usedTitles: this.settings
          .fretboards()
          .map((fretboard) => fretboard.title()),
      },
    });

    dialogRef.afterClosed().subscribe((newTitle) => {
      console.log('The dialog was closed');
      if (newTitle !== undefined) {
        console.log('New title: ' + newTitle);
        fretboard.title.set(newTitle);
      }
    });
  }
}
