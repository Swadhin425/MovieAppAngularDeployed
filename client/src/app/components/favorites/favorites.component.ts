import { Component, OnInit } from '@angular/core';
import { FavoriteService } from './services/favorite.service';
import { AuthService } from 'src/app/auth.service';
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../Config';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies:any;
  imgUrl:string;
  constructor(private favorite:FavoriteService,private auth: AuthService) { }

  ngOnInit() {
    const user ={
      userFrom:JSON.parse(localStorage.getItem('userData')).id
    }
    console.log(user);
    this.favorite.getFavotiteMovies(user).subscribe((movies)=>{
      this.favoriteMovies = movies.favorites;
      console.log(movies);
     this.imgUrl=`${IMAGE_BASE_URL}${POSTER_SIZE}`;
    })
  }

}
