import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { finalize, map, Subject, takeUntil } from 'rxjs';
import { ResumeService } from './resume.service';
import { Resume } from './resume.types';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements OnInit, OnDestroy {
  isLoading = true;
  data!: Resume;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * constructor
   */
  constructor(
    private _sanitizer: DomSanitizer,
    private _changeDetectorRef: ChangeDetectorRef,
    private _translocoService: TranslocoService,
    private _resumeService: ResumeService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get initial data
    this._getData(this._translocoService.getActiveLang());

    // Subscribe to language changes
    this._translocoService.langChanges$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((activeLang) => {
        // Get the data
        this._getData(activeLang);
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
   * Safe html
   *
   * @param value
   * @returns
   */
  generateSafeHtml(value: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get resume data
   *
   * @param activeLang
   * @private
   */
  private _getData(activeLang: string): void {
    // Set true to isLoading
    this.isLoading = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    this._resumeService
      .getData(activeLang)
      .pipe(
        map((response) => {
          // Update the data
          this.data = response;
        }),
        finalize(() => {
          // Set false to isLoading
          this.isLoading = false;

          // Mark for check
          this._changeDetectorRef.markForCheck();
        })
      )
      .subscribe();
  }
}
