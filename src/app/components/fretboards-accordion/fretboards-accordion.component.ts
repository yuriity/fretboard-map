import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { SettingsService } from '../../services/settings.service';
import { RenameFretboardDialogComponent } from '../dialogs/rename-fretboard-dialog.component';
import { DeleteFretboardDialogComponent } from '../dialogs/delete-fretboard-dialog.component';
import { FretboardSettings } from '../../models/fretboard-settings';

@Component({
  selector: 'fbm-fretboard-accordion',
  imports: [MatButtonModule, MatExpansionModule, MatIconModule],
  templateUrl: './fretboards-accordion.component.html',
  styles: `
    .accordion-headers-align .mat-expansion-panel-header-description {
      justify-content: space-between;
      align-items: center;
    }
  `,
})
export class FretboardsAccordionComponent {
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
      if (newTitle !== undefined) {
        fretboard.title.set(newTitle);
      }
    });
  }

  openDeleteFretboardDialog(fretboard: FretboardSettings): void {
    const dialogRef = this.dialog.open(DeleteFretboardDialogComponent, {
      data: { title: fretboard.title() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.settings.removeFretboard(fretboard.id);
      }
    });
  }
}
