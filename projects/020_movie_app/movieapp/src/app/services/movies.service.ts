import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Movie } from "../model/movies";

@Injectable()
export class MovieService {
    url:string="http://localhost:3000/movies";
    message:string="";

    constructor(private http:HttpClient){}

        getMovies(categoryId:number):Observable<Movie[]> {

            let newUrl=this.url;

            if(categoryId){
                newUrl+='?categoryId='+ categoryId;
            }

            return this.http.get<Movie[]>(newUrl).pipe(
                tap(data=>console.log(data)),
                catchError(this.handleError)
                ); 
        
    }
 
    getMovieById(movieId:number):Observable<Movie>{
        return this.http.get<Movie>(this.url+"/"+movieId).pipe(
            tap(data=>console.log(data)),
            catchError(this.handleError)
            ); 
    }

    createMovie(movie:Movie):Observable<Movie> {
        const httpOptions={
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization':'Token'
            })
        }
        return this.http.post<Movie>(this.url,movie, httpOptions).pipe(
            tap(data=>console.log(data)),
            catchError(this.handleError)
            );
    }

    private handleError(error:HttpErrorResponse){
        
        if(error.error instanceof ErrorEvent){
            //client ya da network hataları
            this.message=error.error.message;
        }else{
            // backend hatası
            switch(error.status){
                case 404:
                    this.message="not found"
                    break;
                case 403:
                    this.message="access denied";
                    break;
                default:
                    this.message="not knowing error"
            }
        }
        return throwError(this.message);
    }
}