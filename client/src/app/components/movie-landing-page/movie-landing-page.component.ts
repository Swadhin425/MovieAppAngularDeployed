import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MovieService } from '../../movie.service';
import { API_KEY, API_URL, IMAGE_BASE_URL, BACKDROP_SIZE } from '../../Config';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-landing-page',
  templateUrl: './movie-landing-page.component.html',
  styleUrls: ['./movie-landing-page.component.css']
})
export class MovieLandingPageComponent implements OnInit {
  @ViewChild('btnLoad')  btnLoad;
  movieUrl: string = '';
  page:number=1;
  moviesData: any;
  filteredData:any;
searchString:string;
  showcaseImgUrl: string = '';
  constructor(private movieService: MovieService,private spinner: NgxSpinnerService) { }

  ngOnInit() {


    this.movieUrl = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    this.movieService.getMovies(this.movieUrl).subscribe((data) => {
      this.moviesData = data.results;
      this.filteredData=this.moviesData;
      this.showcaseImgUrl = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.moviesData[0].backdrop_path}`;
    })

    this.spinner.show()
    setTimeout(()=>
    {
    this.spinner.hide()
    },2000)

    this.movieService.searchMovies.subscribe((data) => {

      this.searchString = data;
      if (data !== "") {
        this.filteredData = this.moviesData.filter(movie => movie.title.toLowerCase().includes(data.toLowerCase()));
      } else if (data === "") {
        this.filteredData = this.moviesData;
      }

    });
    window.addEventListener("scroll", this.handleScroll);

  }


  handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {

        // loadMoreItems()
        console.log('clicked');
        console.log(this.btnLoad);
        this.btnLoad.nativeElement.click();
       // buttonRef.current.click();

    }
}

  getMovies(){
    this.page++
    this.movieUrl = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    this.movieService.getMovies(this.movieUrl).subscribe((data) => {
     data.results.forEach((movie)=>{
       //this.moviesData.push(movie);
       this.filteredData.push(movie);

     })
     if(this.searchString !==""){
      this.filteredData = this.filteredData.filter(movie => movie.title.toLowerCase().includes(this.searchString.toLowerCase()));
    }
    })

  }

}
