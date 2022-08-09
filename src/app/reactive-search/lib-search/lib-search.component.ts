import { HttpClient, HttpParams } from '@angular/common/http';
import { ReactiveSearchService } from './../service/reactive-search.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, EMPTY, map, tap } from 'rxjs';

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

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields: fields
      }

      let params = new HttpParams();
      params.set('search', value),
      params.set('fields', fields)

      this.results$ = this.httpClient
        .get(
          this.SEARCH_URL, {
            params
          }
        )
        .pipe(
          tap((response: any) => (this.total = response.total)),
          map((response: any) => response.results)
        );
    }
  }
}
