import { HttpClient, HttpParams } from '@angular/common/http';
import { ReactiveSearchService } from './../service/reactive-search.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Observable,
  EMPTY,
  map,
  tap,
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any> = EMPTY;
  total: number = 0;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
      .pipe(
        map((value) => value.trim()),
        filter((value) => value.length > 1),
        debounceTime(200),
        distinctUntilChanged(),
        // tap((value) => console.log(value)),
        switchMap((value) =>
          this.httpClient.get(this.SEARCH_URL, {
            params: {
              search: value,
              fields: this.FIELDS,
            }
          })),
        tap((response: any) => this.total = response.total),
        map((response: any) => response.results)
      );
  }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {
      const params_ = {
        search: value,
        fields: fields,
      };

      let params = new HttpParams();
      (params = params.set('search', value)),
        (params = params.set('fields', fields));

      this.results$ = this.httpClient.get(this.SEARCH_URL, { params }).pipe(
        tap((response: any) => (this.total = response.total)),
        map((response: any) => response.results)
      );
    }
  }
}
