import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  url: string
  headers: HttpHeaders = new HttpHeaders;
  constructor( private http: HttpClient, private router: Router) {
    this.url = 'http://localhost:8080'
   }

  getFoodById(id:number) : Observable<any>{
    const options = {headers: this.headers, method: 'get'}
    return this.http
    .get(`${this.url}/home/${id}`,options)
    .pipe()
  }

  getFoodbyTag(tagName: string): Observable<any>{
    const options = {headers: this.headers, method: 'get'}
    return this.http
    .get(`${this.url}/home?tag=${tagName}`,options)
    .pipe()
  }

  getFoodbySearch(search: string): Observable<any>{
    const options = {headers: this.headers, method: 'get'}
    return this.http
    .get(`${this.url}/home?search=${search}`,options)
    .pipe()
  }

  getAllFoods(): Observable<any> {
    const options = {headers: this.headers, method: 'get'}
    return this.http
    .get(`${this.url}/home`,options)
    .pipe()
  }
  // registerUser(user: any): Observable<{message: string}> {
  //   const  options = { headers: this.headers, method: 'post'}
  //   return this.http
  //   .post<{message:string}>(this.url+this.router.url, {user: user}, options)
  //   .pipe()
  //  }
  saveToCart(cartItem: any): Observable<any> {
    const  options = { headers: this.headers, method: 'post'}
    return this.http
    .post<any>(`${this.url}/home`, {cartItem: cartItem}, options)
    .pipe()
  }
}


