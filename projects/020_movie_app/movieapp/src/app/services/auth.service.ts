import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthResponse } from '../model/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUpUrl:string="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe1AmxWVYGaEiRAYaDRswsWEYhFblV1OY";

  signInUrl:string="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe1AmxWVYGaEiRAYaDRswsWEYhFblV1OY";


  constructor(private http:HttpClient) { }


  signUp(email:string, password:string){
    return this.http.post<AuthResponse>(this.signUpUrl,{
      email:email,
      password:password,
      returnSecureToken:true
    })
  }

  signIn(email:string, password:string){
    return this.http.post<AuthResponse>(this.signInUrl,{
      email:email,
      password:password,
      returnSecureToken:true
    })
  }

  private handleError(response:HttpErrorResponse){
    let message ="occured a mistake";

    if(!navigator.onLine){
      message="no connection";
      return throwError(message);
  }

  if(response.error.error){
      if(response.status===401){
          message="no permission";
          console.log(message);
          return throwError(message);
      }
  }

  if(response.error.error){
      switch(response.error.error.message){
        case "EMAIL_EXISTS":
          message="can not create account with used email";
          break;

        case "EMAIL_NOT_FOUND":
          message="email not found";
          break;

        case "INVALID_PASSWORD":
          message="invalid password";
          break;
      }
    }

    return throwError(message);
  }

}
