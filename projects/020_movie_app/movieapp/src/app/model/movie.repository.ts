import { Movie } from "./movies";

export class MovieRepository{
    private movies:Movie[]=[];

    constructor(){
        this.movies=[
            {id:1, title:"Movie1", description:"Explation of Movie1", imageUrl:"1.jpg", isPopular:true},
            {id:2, title:"Movie2", description:"Explation of Movie2", imageUrl:"2.jpg", isPopular:true},
            {id:3, title:"Movie3", description:"Explation of Movie3", imageUrl:"3.jpg", isPopular:false},
            {id:4, title:"Movie4", description:"Explation of Movie4", imageUrl:"4.jpg", isPopular:false},
            {id:5, title:"Movie5", description:"Explation of Movie5", imageUrl:"5.jpg",isPopular:true},
          ];
    }

    getMovies():Movie[]{
        return this.movies;
    }

    getPopularMovies(): Movie[]{
        return this.movies.filter(i=>i.isPopular==true);
    }

    getMovieById(id:number): Movie | undefined{
        return this.movies.find(i=>i.id==id);
    }
}