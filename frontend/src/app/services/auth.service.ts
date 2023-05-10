import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string
  headers: HttpHeaders = new HttpHeaders;
  constructor( private http: HttpClient, private router: Router, private cookieservice: CookieService) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
    this.url = 'http://localhost:8080'
   }

   registerUser(user: any): Observable<{message: string}> {
    const  options = { headers: this.headers, method: 'post'}
    return this.http
    .post<{message:string}>(this.url+this.router.url, {user: user}, options)
    .pipe()
   }

   loginUser(user: any): Observable<{message: string}> {
    console.log(user)
    const  options = { headers: this.headers, method: 'get'}
    return this.http
    .get<{message: string}>(`${this.url+this.router.url}?email=${user.email}&password=${user.password}`,options )
    .pipe()
   }

   isLoggedIn() {
    if(this.cookieservice.get('token')) {
      return true
    }
    return false
   }

   getToken() {
    if(this.isLoggedIn()) {
      return this.cookieservice.get('token')
    }
    return undefined
   }

}
