import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { Http, Headers, RequestOptions } from '@angular/http';

import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class DataService {

  result: any;

  private userUrl = 'http://localhost:4000/api/users';

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get(this.userUrl)
      .pipe(map(result => this.result = result.json().data));
  }

}