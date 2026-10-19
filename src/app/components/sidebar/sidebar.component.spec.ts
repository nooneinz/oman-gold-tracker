import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { TranslatePipe } from '../../core/translate.pipe';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [SidebarComponent, TranslatePipe]
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
