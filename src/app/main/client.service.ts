import { Client } from './client';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API } from '../../environments/api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  readonly url: string = `${API}/api/v1/client`;

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<any>(this.url, httpOptions);
  }
}
