import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, delay, map, tap } from "rxjs/operators";
import { Movie } from "../model/movies";

@Injectable()
export class MovieService {
    url:string="http://localhost:3000/movies";
    url_firebase="https://angular-movie-app-9a021-default-rtdb.firebaseio.com/";
    message:string="";

    constructor(private http:HttpClient){}

        getMovies(categoryId?:number):Observable<Movie[]> {

            
            return this.http.get<Movie[]>(this.url_firebase + "movies.json").pipe(
                map(response=>{
                    const movies: Movie[]=[];

                    for(const key in response){
                        if(categoryId){
                            if(categoryId===response[key].categoryId){
                                movies.push({...response[key], id:key});                                
                            }
                        }else{
                            movies.push({...response[key], id:key});
                        }
                    }

                    return movies;
                }),
                catchError(this.handleError), 
                delay(500)
                ); 
        
    }
 
    getMovieById(movieId:string):Observable<Movie>{
        return this.http.get<Movie>(this.url_firebase+"movies/"+movieId+".json").pipe(
            tap(data=>console.log(data)),
            catchError(this.handleError),
            delay(500)
            ); 
    }

    createMovie(movie:Movie):Observable<Movie> {
        const httpOptions={
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization':'Token'
            })
        }
        return this.http.post<Movie>(this.url_firebase + "/movies.json",movie, httpOptions).pipe(
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