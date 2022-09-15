import { BreakpointState } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfigService } from 'src/app/shared/config';
import { LayoutConfig, LayoutScheme } from '../../layout.types';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'scheme',
})
export class SchemeComponent implements OnInit, OnDestroy {
  config!: LayoutConfig;
  currentScheme!: string;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _configService: ConfigService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._configService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: LayoutConfig) => {
        // Store the config
        this.config = config;

        // Set current scheme
        if (this.config.scheme === 'auto') {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.currentScheme = 'dark';
          } else {
            this.currentScheme = 'light';
          }
        } else {
          this.currentScheme = this.config.scheme;
        }
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
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the scheme on the config
   *
   * @param scheme
   */
  setScheme(scheme: LayoutScheme): void {
    this._configService.config = { scheme };
  }
}
