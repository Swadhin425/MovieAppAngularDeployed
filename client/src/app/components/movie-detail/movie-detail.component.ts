import { Component, OnInit, ElementRef } from '@angular/core';
import { MovieService } from '../../movie.service';
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from '../../Config';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavoriteService } from '../favorites/services/favorite.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieDetails: any;
  showcaseImgUrl: string;
  posterImgUrl: string;
  showCast: boolean = false
  castDetails: [];
  showLike: boolean = true;
  userDetails:any;
  constructor(private movieservice: MovieService,
    private spinner: NgxSpinnerService
    , private favorite: FavoriteService) { }

  ngOnInit() {

    this.spinner.show()
    //this.movieDetails =this.movieservice.movieData;
    this.movieDetails = window.history.state.data;
    this.userDetails = window.history.state.userDetails;
    this.movieservice.movieData = undefined;
    console.log(window.history.state.data);

    this.showcaseImgUrl = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.movieDetails.backdrop_path}`;
    this.posterImgUrl = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.movieDetails.poster_path}`;


    setTimeout(() => {
      this.spinner.hide()
    }, 2000)
     this.isFavotiteMovie()
  }

  isFavotiteMovie(){
    const movieData={
      userFrom: this.userDetails.id,
      movieId:this.movieDetails.id

    };
    console.log(movieData)
    this.favorite.isFavoriteMovie(movieData).subscribe((data) => {
      console.log(data);

      if(data.success === true  && data.doc.length>0){
        this.showLike = !data.success;
      }

    })
  }

  onClick() {

    var url = `${API_URL}movie/${this.movieDetails.id}/credits?api_key=${API_KEY}`;
    this.movieservice.getCastDetails(url).subscribe((castDetails) => {
      this.castDetails = castDetails.cast;
      console.log(castDetails);
    })
    this.showCast = !this.showCast;
  }

  getStyle() {
    return { fade: true }
  }

  addToFavorite() {

    const movieData={
      userFrom: this.userDetails.id,
      movieId:this.movieDetails.id,
      movieTitle:this.movieDetails.title,
      moviePost:this.movieDetails.poster_path,
      movieRuntime:this.movieDetails.runtime

    };
    console.log(movieData)
    this.favorite.addToFavorites(movieData).subscribe((data)=>{
      console.log(data);
    })
    this.showLike = false;
  }

  removeFromFavorite() {
    console.log(this.userDetails);
    const movieData={
      userFrom: this.userDetails.id,
      movieId: this.movieDetails.id
    };
    console.log(movieData);
    this.favorite.removeFromFavorites(movieData).subscribe((data)=>{
      console.log(data);
    })
    this.showLike = true;
    console.log(this.showLike);
  }


}
