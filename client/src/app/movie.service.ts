import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
searchMovies: EventEmitter<any> = new EventEmitter() ;

movieData: any;


constructor(private http: HttpClient) { }

getMovies(endpoint): Observable<any>{
 return this.http.get<any>(endpoint);
}

getMovieDetails(endpoint): Observable<any>{
  return this.http.get<any>(endpoint);
 }

 getCastDetails(endpoint): Observable<any>{
  return this.http.get<any>(endpoint);
 }


 getRelatedMovies(endpoint): Observable<any>{
  return this.http.get<any>(endpoint);
 }




}

