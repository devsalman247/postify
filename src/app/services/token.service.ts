import { Injectable, signal } from '@angular/core';

export type Token = string | null;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  token = signal<Token>(null);

  getToken(): Token {
    return localStorage.getItem('token');
  }

  setToken(token: Token) {
    localStorage.setItem('token', token ?? '');
    this.token.set(token);
  }

  clearToken() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}
