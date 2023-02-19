import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DAYS_API } from './days-api';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    @Inject(DAYS_API) private readonly api: string,
    private readonly httpClient: HttpClient
  ) {}

  login(email: string, password: string) {
    return this.httpClient.post(`${this.api}/auth/login`, {
      email,
      password,
    });
  }
  register(email: string, password: string) {
    return this.httpClient.post(`${this.api}/auth/register`, {
      email,
      password,
    });
  }
}
