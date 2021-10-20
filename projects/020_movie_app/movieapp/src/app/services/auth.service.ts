import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../model/AuthResponse';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUpUrl:string="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe1AmxWVYGaEiRAYaDRswsWEYhFblV1OY";

  signInUrl:string="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe1AmxWVYGaEiRAYaDRswsWEYhFblV1OY";

  user= new BehaviorSubject<User>(null);


  constructor(private http:HttpClient, private router:Router) { }


  signUp(email:string, password:string){
    return this.http.post<AuthResponse>(this.signUpUrl,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      tap(response=>{
        this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn);
      })
    )
  }

  signIn(email:string, password:string){
    return this.http.post<AuthResponse>(this.signInUrl,{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      tap(response=>{
        this.handleAuthentication(response.email,response.localId,response.idToken,+response.expiresIn);
      })
    )
  }

  signout(){
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigate(["/auth"]);
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

  autoLogin(){
    const user=JSON.parse(localStorage.getItem("user"));
    if(!user){
      return;
    }

    const loadedUser=new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

  handleAuthentication(email:string,userId:string, token:string, expireIn:number){
    
    const expirationDate=new Date(new Date().getTime() + (expireIn * 1000));
    const user=new User(
      email,
      userId,
      token,  
      expirationDate     
    );

    this.user.next(user); 

    localStorage.setItem("user", JSON.stringify(user));
  }

}
