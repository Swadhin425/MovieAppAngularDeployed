import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject,throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

const httpOption={ headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  //authUrl:string=  'http://localhost:5004/api/users/';
  authUrl: string = 'https://rocky-tor-67656.herokuapp.com/api/users/';
  loogedIn:boolean=false;

  user= new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;

  constructor(private http: HttpClient) { }

  register(userInfo): Observable<any> {
    var registerUrl = this.authUrl + 'register';
    return this.http.post<any>(registerUrl, JSON.stringify(userInfo), httpOption);
  }
  login(userInfo): Observable<any> {
    var loginUrl = this.authUrl + 'login';
    return this.http.post<any>(loginUrl, JSON.stringify(userInfo), httpOption)
      .pipe(catchError(errorRes => {
        return throwError(errorRes);
      }), tap(resData => {
        this.handleAuthentication(resData.email, resData.userId, resData.token, +resData.expiresIn,resData.image)
      }))
      ;
  }


  logout(userInfo): Observable<any> {
    var loginUrl = this.authUrl + 'logout';
    return this.http.post<any>(loginUrl, JSON.stringify(userInfo), httpOption)
      .pipe(catchError(errorRes => {
        return throwError(errorRes);
      }), tap(resData => {
        this.handleLogout(resData.sucess);
      }))
      ;
  }


  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      image: string;
    }
      = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate), userData.image);
    console.log(loadedUser.token);
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationTime) {
    console.log(expirationTime);
    this.tokenExpirationTimer = setTimeout(() => {
      this.handleLogout(true);
    }, expirationTime)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number, image: string) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)

    const user = new User(email, userId, token, expirationDate, image);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleLogout(success: boolean) {
   if(success === true){
     this.user.next(null);
     localStorage.removeItem('userData');
     if(this.tokenExpirationTimer){
       clearTimeout(this.tokenExpirationTimer);
     }
     this.tokenExpirationTimer = null;
   }
  }



}
