import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'gold-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeSubject = new BehaviorSubject<ThemeMode>(this.readInitialTheme());
  readonly theme$ = this.themeSubject.asObservable();

  constructor() {
    this.apply(this.themeSubject.value);
  }

  get current(): ThemeMode {
    return this.themeSubject.value;
  }

  toggle(): void {
    this.set(this.current === 'dark' ? 'light' : 'dark');
  }

  set(mode: ThemeMode): void {
    this.themeSubject.next(mode);
    this.apply(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage unavailable, ignore */
    }
  }

  private apply(mode: ThemeMode): void {
    const root = document.documentElement;
    root.classList.toggle('dark', mode === 'dark');
  }

  private readInitialTheme(): ThemeMode {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      /* ignore */
    }
    // The platform's visual identity is dark-first (black + gold), so new
    // visitors land on dark mode regardless of OS preference; light stays
    // available as an explicit opt-in via the toggle.
    return 'light';
  }
}
