import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TRANSLATIONS } from './translations';

export type Lang = 'ar' | 'en';

const STORAGE_KEY = 'gold-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly langSubject = new BehaviorSubject<Lang>(this.readInitialLang());
  readonly lang$ = this.langSubject.asObservable();

  constructor() {
    this.apply(this.langSubject.value);
  }

  get current(): Lang {
    return this.langSubject.value;
  }

  get dir(): 'rtl' | 'ltr' {
    return this.current === 'ar' ? 'rtl' : 'ltr';
  }

  toggle(): void {
    this.set(this.current === 'ar' ? 'en' : 'ar');
  }

  set(lang: Lang): void {
    this.langSubject.next(lang);
    this.apply(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }

  translate(key: string): string {
    const entry = TRANSLATIONS[key];
    if (!entry) {
      return key;
    }
    return this.current === 'ar' ? entry[0] : entry[1];
  }

  private apply(lang: Lang): void {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body?.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }

  private readInitialLang(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    } catch {
      /* ignore */
    }
    return 'ar';
  }
}
