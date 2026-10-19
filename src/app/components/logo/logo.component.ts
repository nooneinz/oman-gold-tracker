import { Component, Input } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'app-logo',
  template: `
    <span class="inline-flex items-center gap-2.5" dir="ltr">
      <svg viewBox="0 0 40 40" [style.width.px]="size * 1.5" [style.height.px]="size * 1.5" aria-hidden="true">
        <defs>
          <linearGradient [attr.id]="id + 'a'" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#F6DDA8" /><stop offset=".5" stop-color="#D4A262" /><stop offset="1" stop-color="#8C5A2B" />
          </linearGradient>
          <linearGradient [attr.id]="id + 'b'" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#FFF1CF" /><stop offset="1" stop-color="#E2B876" />
          </linearGradient>
        </defs>
        <!-- faceted ingot inside a ring -->
        <circle cx="20" cy="20" r="18.5" fill="none" [attr.stroke]="'url(#' + id + 'a)'" stroke-width="1.4" />
        <path d="M11 24.500 14.500 15h11l3.500 9.500Z" [attr.fill]="'url(#' + id + 'b)'" />
        <path d="M11 24.500h18l-2.500 4.500h-13Z" [attr.fill]="'url(#' + id + 'a)'" />
        <path d="M14.500 15h11" stroke="#fff" stroke-opacity=".6" stroke-width=".8" />
        <path d="M20 8.500v2.500M17 9.800l1 1.800M23 9.800l-1 1.800" stroke="#E2B876" stroke-width="1" stroke-linecap="round" />
      </svg>
      <span class="flex items-baseline gap-1 leading-none" [class.text-white]="tone === 'light'" [class.text-ink]="tone !== 'light'">
        <span class="brand-font font-bold tracking-wide" [style.font-size.px]="size * 1.25">Gold</span>
        <span class="font-semibold tracking-[0.28em] text-gold" [style.font-size.px]="size * 0.62">OMR</span>
      </span>
    </span>
  `,
})
export class LogoComponent {
  @Input() size = 20;
  @Input() tone: 'auto' | 'light' = 'auto';
  readonly id = `logo${nextId++}`;
}
