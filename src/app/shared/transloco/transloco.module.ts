import { APP_INITIALIZER, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TranslocoModule,
  TranslocoService,
  TranslocoConfig,
} from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco.http-loader';
import { ConfigService } from '../config';
import { LocaleProvider } from './locale.provider';

import localeEn from '@angular/common/locales/en';
import localeFa from '@angular/common/locales/fa';
registerLocaleData(localeEn, 'en');
registerLocaleData(localeFa, 'fa');

@NgModule({
  providers: [
    {
      // Provide the default Transloco configuration
      provide: TRANSLOCO_CONFIG,
      deps: [ConfigService],
      useFactory: (configService: ConfigService): TranslocoConfig => ({
        availableLangs: [
          {
            id: 'en',
            label: 'English',
          },
          {
            id: 'fa',
            label: 'فارسی',
          },
        ],
        defaultLang: configService.config.language,
        fallbackLang: configService.config.language,
        reRenderOnLangChange: true,
        prodMode: true,
      }),
    },
    {
      // Provide the default Transloco loader
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader,
    },
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      deps: [TranslocoService],
      useFactory:
        (translocoService: TranslocoService): any =>
        (): Promise<Translation | undefined> => {
          const defaultLang = translocoService.getDefaultLang();
          translocoService.setActiveLang(defaultLang);
          return translocoService.load(defaultLang).toPromise();
        },
      multi: true,
    },
    LocaleProvider,
  ],
  exports: [TranslocoModule],
})
export class AppTranslocoModule {}
