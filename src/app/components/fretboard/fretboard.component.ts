import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { GuitarFretComponent } from './guitar-fret/guitar-fret.component';
import { SettingsService } from '../../services/settings.service';
import { ViewOptions } from '../../models/view-options';

@Component({
  selector: 'fbm-fretboard',
  standalone: true,
  imports: [CommonModule, GuitarFretComponent],
  templateUrl: './fretboard.component.html',
  styleUrls: ['./fretboard.component.scss'],
})
export class FretboardComponent implements OnInit {
  ViewOptions = ViewOptions;

  constructor(public settings: SettingsService) {}

  ngOnInit(): void {}
}
