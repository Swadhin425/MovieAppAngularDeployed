import { Component, OnInit ,OnDestroy} from '@angular/core';
import {MovieService}  from '../../movie.service';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit ,OnDestroy {
  private userSub: Subscription;
  private user:any;
  searchString:string;
  loogedIn:boolean=false;
  constructor(private movieService: MovieService,private auth:AuthService,private router:Router) { }

  ngOnInit() {
    //this.loogedIn =this.auth.loogedIn;
   this.userSub= this.auth.user.subscribe(user => {
      this.loogedIn = !user ? false : true;
      this.user = user;
    });
  }

  onChange(){
this.movieService.searchMovies.emit(this.searchString);

  }
  onKeyPress(event){
    event.preventDefault();
    this.movieService.searchMovies.emit(this.searchString);
  }
  onLogOut() {
    const user = {
      _id: this.user.id,
      token: this.user.token
    };
    this.auth.logout(user).subscribe((data) => {

      this.router.navigate(['/login']);
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
