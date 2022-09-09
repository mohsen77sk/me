import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';
import { ConfigService } from '../shared/config';
import { MediaWatcherService } from '../shared/media-watcher';
import {
  LayoutConfig,
  LayoutDirection,
  LayoutScheme,
  LayoutTheme,
} from './layout.types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {
  //
  layoutConfig!: LayoutConfig;
  layoutDirection!: LayoutDirection;
  layoutScheme!: LayoutScheme;
  layoutTheme!: LayoutTheme;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    @Inject(DOCUMENT) private _document: any,
    private _configService: ConfigService,
    private _mediaWatcherService: MediaWatcherService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the theme and scheme based on the configuration
    combineLatest([
      this._configService.config$,
      this._mediaWatcherService.onMediaQueryChange$([
        '(prefers-color-scheme: dark)',
        '(prefers-color-scheme: light)',
      ]),
    ])
      .pipe(
        takeUntil(this._unsubscribeAll),
        map(([config, mql]) => {
          const options = {
            scheme: config.scheme,
            theme: config.theme,
          };

          // If the scheme is set to 'auto'...
          if (config.scheme === 'auto') {
            // Decide the scheme using the media query
            options.scheme = mql.breakpoints['(prefers-color-scheme: dark)']
              ? 'dark'
              : 'light';
          }

          return options;
        })
      )
      .subscribe((options) => {
        // Store the options
        this.layoutScheme = options.scheme;
        this.layoutTheme = options.theme;

        // Update the layout scheme and layout theme
        this._updateLayoutScheme();
        this._updateLayoutTheme();
      });

    // Subscribe to config changes
    this._configService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: LayoutConfig) => {
        // Store the layoutConfig
        this.layoutConfig = config;

        // Update the layout direction
        this._updateLayoutDirection();
      });
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
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the selected scheme
   *
   * @private
   */
  private _updateLayoutScheme(): void {
    // Remove class names for all schemes
    this._document.body.classList.remove('light', 'dark');

    // Add class name for the currently selected scheme
    this._document.body.classList.add(this.layoutScheme);
  }

  /**
   * Update the selected theme
   *
   * @private
   */
  private _updateLayoutTheme(): void {
    // Find the class name for the previously selected theme and remove it
    this._document.body.classList.forEach((className: string) => {
      if (className.startsWith('theme-')) {
        this._document.body.classList.remove(
          className,
          className.split('-')[1]
        );
      }
    });

    // Add class name for the currently selected theme
    this._document.body.classList.add(this.layoutTheme);
  }

  /**
   * Update the selected direction
   *
   * @private
   */
  private _updateLayoutDirection(): void {
    // 1. Set the direction from the layoutConfig
    this.layoutDirection = this.layoutConfig.direction;
    // 2. Change dir attribute for the currently selected direction
    this._document.documentElement.setAttribute('dir', this.layoutDirection);
    this._document.body.setAttribute('dir', this.layoutDirection);
  }
}
