import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Subject, takeUntil } from 'rxjs';
import { ConfigService } from 'src/app/shared/config';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'languages',
})
export class LanguagesComponent implements OnInit, OnDestroy {
  //
  availableLangs!: { id: string; label: string }[];
  activeLang!: string;
  flagCodes!: any;
  directionCodes!: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _translocoService: TranslocoService,
    private _configService: ConfigService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the available languages from transloco
    this.availableLangs = this._translocoService.getAvailableLangs() as {
      id: string;
      label: string;
    }[];

    // Subscribe to language changes
    this._translocoService.langChanges$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((activeLang) => {
        // Get the active lang
        this.activeLang = activeLang;
      });

    // Set the country iso codes for languages for flags
    this.flagCodes = {
      en: 'gb',
      fa: 'ir',
    };

    // Set the direction codes for languages for direction
    this.directionCodes = {
      en: 'ltr',
      fa: 'rtl',
    };
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the active lang
   *
   * @param lang
   */
  setActiveLang(lang: string): void {
    // Set the active lang
    this._translocoService.setActiveLang(lang);
    // Set the active lang & direction in config
    this._configService.config = {
      language: lang,
      direction: this.directionCodes[lang],
    };
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
