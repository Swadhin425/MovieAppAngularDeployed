import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

// Import the library
import { NgxStripeModule } from 'ngx-stripe';

import {MovieLandingPageComponent} from './components/movie-landing-page/movie-landing-page.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MovieCardComponent} from './components/movie-landing-page/movie-card/movie-card.component';
import {RelatedMoviesComponent} from './components/movie-detail/related-movies/related-movies.component';
import {FooterComponent} from './components/footer/footer.component';
import {MovieDetailComponent} from './components/movie-detail/movie-detail.component';
import {ActorCardComponent} from './components/movie-detail/actor-card/actor-card.component';
import {FavoritesComponent} from './components/favorites/favorites.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ShowcaseComponent} from './components/common/showcase/showcase.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommentListComponent } from './components/movie-detail/comment-list/comment-list.component';
import { SinglyCommentComponent } from './components/movie-detail/singly-comment/singly-comment.component';
import { ReplyCommentComponent } from './components/movie-detail/reply-comment/reply-comment.component';
import { LikeDislikeComponent } from './components/movie-detail/like-dislike/like-dislike.component';
import { PaymentComponent } from './payment/payment.component';
import {FavComponent} from './components/favorites/FavPage/fav.component';
import { MovieBookingComponent } from './components/movie-booking/movie-booking.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieLandingPageComponent,
    NavBarComponent,
    MovieCardComponent,
    MovieDetailComponent,
    FooterComponent,
    ActorCardComponent,
    FavoritesComponent,
    LoginComponent,
    RegisterComponent,
    ShowcaseComponent,
    RelatedMoviesComponent,
    DashboardComponent,
    CommentListComponent,
    SinglyCommentComponent,
    ReplyCommentComponent,
    LikeDislikeComponent,
    PaymentComponent,
    FavComponent,
    MovieBookingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51HNbHSL6HY0TCwA7iCiRZG88zmdFYtSuxsikizTAWxgSjURggeBXkWSjfLR8l5y2GhJAMHpWyepdvYA71PuXybQ200MJlV9yJA')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
