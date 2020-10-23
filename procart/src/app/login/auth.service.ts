import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);     // null is a default/first value which will be emitted by Subject when no user is logged in..
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEmksN-zRH-qzGFk_VM0Zvil99kouwvXc',
            {
              email: email,
              password: password,
              returnSecureToken: true
            }
          )
          .pipe(
            catchError(this.handleError),
            tap(resData => {                // we use tap here as it doesnt change the response but runs some operation parallelly to our request 
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            })
        );
    }

    login(email: string, password: string) {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEmksN-zRH-qzGFk_VM0Zvil99kouwvXc',
            {
              email: email,
              password: password,
              returnSecureToken: true
            }
          )
          .pipe(
            catchError(this.handleError),
            tap(resData => {
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn          // forwarding the necessary data to this method
              );
            })
          );
    }

    autoLogin() {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));       // Json parse will convert it back to Java Script Object fron JSON String 
        if (!userData) {
          return;
        }
    
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
    
        if (loadedUser.token) {         // Check if fetched token from local storage is still valid or not
          this.user.next(loadedUser);   // Emit new Value for user
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -    // this gives future date when token will be expired in milliseconds
            new Date().getTime();               // this gives current date in milliseconds
          this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);       // set our user to null as it was initially
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {        // If timer is active
          clearTimeout(this.tokenExpirationTimer);      // Clearing out the timer in case when we are logging out manually before the Token gets Expired
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {           // This will be used when Token is Expired on own after 1 hour
        this.tokenExpirationTimer = setTimeout(() => {
          this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);       // we multiply here with 1000 to convert this to milliseconds
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
        return throwError(errorMessage);
      }

}