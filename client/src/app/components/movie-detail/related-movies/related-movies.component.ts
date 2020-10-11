import { Component, OnInit, Input } from '@angular/core';
import {MovieService} from '../../../movie.service';
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from '../../../Config';

@Component({
  selector: 'app-related-movies',
  templateUrl: './related-movies.component.html',
  styleUrls: ['./related-movies.component.css']
})
export class RelatedMoviesComponent implements OnInit {
  @Input()  movieId:string;
  posterImgUrl = `${IMAGE_BASE_URL}${BACKDROP_SIZE}`;

  relatedMovies:[];
  constructor(private movieService:MovieService) { }

  ngOnInit() {
  var url=`${API_URL}movie/${this.movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;

  this.movieService.getRelatedMovies(url).subscribe((relatedMovies)=>{
  this.relatedMovies=relatedMovies.results;
  console.log(relatedMovies);

  });
  }

}
