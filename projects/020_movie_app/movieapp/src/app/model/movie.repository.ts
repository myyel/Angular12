import { Movie } from "./movies";

export class MovieRepository{
    private movies:Movie[]=[];

    constructor(){
        this.movies=[
            {id:1, title:"Movie1", description:"Mehmet orem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, iste? Natus libero nam delectus voluptatum quasi quidem laudantium dolorem pariatur accusamus obcaecati animi assumenda unde, tempore corrupti nisi voluptatibus consectetur!", imageUrl:"1.jpg", isPopular:true, datePublished: new Date(1990,10,10)},
            {id:2, title:"Movie2", description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, iste? Natus libero nam delectus voluptatum quasi quidem laudantium dolorem pariatur accusamus obcaecati animi assumenda unde, tempore corrupti nisi voluptatibus consectetur!", imageUrl:"2.jpg", isPopular:true,datePublished: new Date(1990,10,10)},
            {id:3, title:"Movie3", description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, iste? Natus libero nam delectus voluptatum quasi quidem laudantium dolorem pariatur accusamus obcaecati animi assumenda unde, tempore corrupti nisi voluptatibus consectetur!", imageUrl:"3.jpg", isPopular:false,datePublished: new Date(1990,10,10)},
            {id:4, title:"Movie4", description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, iste? Natus libero nam delectus voluptatum quasi quidem laudantium dolorem pariatur accusamus obcaecati animi assumenda unde, tempore corrupti nisi voluptatibus consectetur!", imageUrl:"4.jpg", isPopular:false,datePublished: new Date(1990,10,10)},
            {id:5, title:"Movie5", description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, iste? Natus libero nam delectus voluptatum quasi quidem laudantium dolorem pariatur accusamus obcaecati animi assumenda unde, tempore corrupti nisi voluptatibus consectetur!", imageUrl:"5.jpg",isPopular:true,datePublished: new Date(1990,10,10)},
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