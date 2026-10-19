import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { TranslatePipe } from '../../core/translate.pipe';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [SettingsComponent, TranslatePipe]
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
