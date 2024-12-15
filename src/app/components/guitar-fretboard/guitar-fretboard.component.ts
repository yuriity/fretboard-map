import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { GuitarFretComponent } from './guitar-fret/guitar-fret.component';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'gfm-guitar-fretboard',
  standalone: true,
  imports: [CommonModule, GuitarFretComponent],
  templateUrl: './guitar-fretboard.component.html',
  styleUrls: ['./guitar-fretboard.component.scss'],
})
export class GuitarFretboardComponent implements OnInit {
  ViewOptions = ViewOptions;

  constructor(public settings: SettingsService) {}

  ngOnInit(): void {}
}
