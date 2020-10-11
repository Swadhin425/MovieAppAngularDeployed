import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  Url: string = 'http://localhost:5004/api/favorite/';
  constructor(private http: HttpClient) { }


  addToFavorites(movieData): Observable<any> {

    const addToFavURL = this.Url + "addToFavorite"
    return this.http.post<any>(addToFavURL, movieData, httpOption);
  }


  removeFromFavorites(movieData): Observable<any> {

    const addToFavURL = this.Url + "removeToFavorite";
    return this.http.post<any>(addToFavURL, movieData, httpOption);

  }

  getFavotiteMovies(movieData) :Observable<any>{
    const addToFavURL = this.Url + "getFavoriteMovies";
    return this.http.post<any>(addToFavURL, movieData, httpOption);
  }

  isFavoriteMovie(movieData) :Observable<any>{
    const addToFavURL = this.Url + "favorited";
    return this.http.post<any>(addToFavURL, movieData, httpOption);
  }
}
