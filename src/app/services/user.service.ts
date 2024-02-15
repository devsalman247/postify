import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  apiUrl = '/users';

  getUsers(): Observable<unknown> {
    return this.http.get(this.apiUrl);
  }

  login(email: string, password: string): Observable<unknown> {
    return this.http.get(
      `${this.apiUrl}?email_eq=${email}&password_eq=${password}`
    );
  }

  register(name: string, email: string, password: string): Observable<unknown> {
    return this.http.post(this.apiUrl, {
      name,
      email,
      password,
    });
  }
}
