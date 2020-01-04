import { tap, catchError, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { API } from './../../environments/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url = `${API}/auth`;

  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/signup`, user);
  }

  login(credentials: { email: string, password: string }): Observable<User> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http
      .post<User>(`${this.url}/signin`, credentials, httpOptions)
      .pipe(
        tap((u: User) => {
          localStorage.setItem('token', u.token);
          this.subjLoggedIn$.next(true);
          this.subjUser$.next(u);
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    /*if (token && !this.subjLoggedIn$.value) {
      return this.checkTokenValidation();
    }*/
    return this.subjLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http
      .get<User>(`${this.url}/user`)
      .pipe(
        tap((u: User) => {
          if (u) {
            this.subjLoggedIn$.next(true);
            this.subjUser$.next(u);
            return of(true);
          }
        }),
        map((u: User) => (u) ? true : false ),
        catchError((err) => {
          this.logout();
          return of(false);
        })
      );
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
