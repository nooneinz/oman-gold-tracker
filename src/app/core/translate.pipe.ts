import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';

/**
 * Impure translation pipe so labels re-render immediately when the
 * active language changes, without wiring manual subscriptions
 * into every component.
 */
@Pipe({ name: 'tr', pure: false })
export class TranslatePipe implements PipeTransform {
  constructor(private readonly i18n: I18nService) {}

  transform(key: string): string {
    return this.i18n.translate(key);
  }
}
