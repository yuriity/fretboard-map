import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FretboardToolbarComponent } from './fretboard-toolbar.component';
import { FretboardSettings } from '../../../models/fretboard-settings';
import { ViewOptions } from '../../../models/view-options';

describe('FretboardToolbarComponent', () => {
  let component: FretboardToolbarComponent;
  let fixture: ComponentFixture<FretboardToolbarComponent>;

  beforeEach(async () => {
    const mockSettings: FretboardSettings = {
      id: 'mock-id',
      title: signal('Mock Title'),
      expanded: signal(true),
      tuning: signal('E4,A3,D3,G3,B3,E2'),
      rootNote: signal('C'),
      scale: signal('Major Scale'),
      viewOption: signal(ViewOptions.TwelveFrets),
    };

    await TestBed.configureTestingModule({
      imports: [FretboardToolbarComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FretboardToolbarComponent);
    fixture.componentRef.setInput('fretboard', mockSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
