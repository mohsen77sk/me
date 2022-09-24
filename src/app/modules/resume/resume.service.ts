import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from './resume.types';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get resume data
   */
  getData(lang: string): Observable<Resume> {
    return this._httpClient.get<Resume>(`assets/data/${lang}.json`);
  }
}
