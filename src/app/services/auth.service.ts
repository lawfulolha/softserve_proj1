import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import { JwtHelperService , JWT_OPTIONS } from '@auth0/angular-jwt';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService
              // ,              private jwtHelper: JwtHelperService
  ) {  }


  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin/', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  public isAuthenticated(): boolean {
    // const token = this.tokenStorageService.getToken();
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }
}
