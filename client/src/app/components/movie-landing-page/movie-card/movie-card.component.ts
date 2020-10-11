import { Component, OnInit, Input } from '@angular/core';
import {IMAGE_BASE_URL, POSTER_SIZE,API_URL,API_KEY} from '../../../Config';
import {MovieService}  from '../../../movie.service';
import {Router}  from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
@Input()  movie;


imgUrl:string;

  constructor(private movieService:MovieService,private router:Router,private auth: AuthService) { }

  ngOnInit() {
    this.imgUrl =`${IMAGE_BASE_URL}${POSTER_SIZE}${this.movie.poster_path}`;
  }

  onClick(){


    this.auth.user.pipe(take(1)).subscribe(user=>{
      if (user) {
        var url = `${API_URL}movie/${this.movie.id}?api_key=${API_KEY}&language=en-US`;
        this.movieService.getMovieDetails(url).subscribe((movieDetails) => {
          // this.movieService.movieData= movieDetails;
          this.router.navigate(['/movieDetail'], { state: { data: movieDetails,userDetails:user } });

        })

     }else{
      this.router.navigate(['/login']);
     }
    });


  }

}
