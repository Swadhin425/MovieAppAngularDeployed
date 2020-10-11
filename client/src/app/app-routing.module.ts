import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component';
import {MovieLandingPageComponent} from './components/movie-landing-page/movie-landing-page.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {MovieCardComponent} from './components/movie-landing-page/movie-card/movie-card.component';
import {FooterComponent} from './components/footer/footer.component';
import {MovieDetailComponent} from './components/movie-detail/movie-detail.component';
import {ActorCardComponent} from './components/movie-detail/actor-card/actor-card.component';
import {FavoritesComponent} from './components/favorites/favorites.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ShowcaseComponent} from './components/common/showcase/showcase.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { AuthGuard } from './components/auth-guard';
import { PaymentComponent } from './payment/payment.component';
import { FavComponent } from './components/favorites/FavPage/fav.component';
import { MovieBookingComponent } from './components/movie-booking/movie-booking.component';


const routes: Routes = [

  { path: '', component: MovieLandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movieDetail', component: MovieDetailComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard],children:[
    {
      path:'favPage',
      component:FavComponent


    }
  ] },
  { path: 'pay', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'movie-booking', component: MovieBookingComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
