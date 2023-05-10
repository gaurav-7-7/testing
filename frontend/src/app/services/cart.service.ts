import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  url: string
  headers: HttpHeaders = new HttpHeaders;
  constructor( private http: HttpClient, private router: Router) {
    this.url = 'http://localhost:8080'
   }

  getCartItems(): Observable<any> {
    const  options = { headers: this.headers, method: 'get'}
    return this.http
    .get<any>(`${this.url}/cart`,options )
    .pipe()
   }
}
