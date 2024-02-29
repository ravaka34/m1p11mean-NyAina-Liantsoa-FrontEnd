import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly http = inject(HttpClient);
  private readonly api_url = environment.baseUrl;

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.api_url}${url}`, {
      headers: this.headers,
      params,
    })
  }

  post<T, D>(url: string, data?: D): Observable<T> {
    return this.http.post<T>(`${this.api_url}${url}`, JSON.stringify(data),
      { headers: this.headers })
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this.http.put<T>(`${this.api_url}${url}`, JSON.stringify(data), {
      headers: this.headers,
    })
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.api_url}${url}`, {
      headers: this.headers,
    })
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
