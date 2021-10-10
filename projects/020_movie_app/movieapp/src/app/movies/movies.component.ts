import { Component, OnInit } from '@angular/core';
import { MovieRepository } from '../model/movie.repository';
import { Movie } from '../model/movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  title="Movie List";
  movies:Movie[];
  filteredMovies:Movie[];
  movieRepository: MovieRepository;

  filterText:string="";
  
  constructor() { 
    this.movieRepository=new MovieRepository();
    this.movies=this.movieRepository.getMovies();
    this.filteredMovies=this.movies;
  }

  ngOnInit(): void {
  }

  onInputChange(){
    this.filteredMovies = this.filterText? this.movies.filter(m=>m.title.toLowerCase().indexOf(this.filterText.toLowerCase())!==-1
    || m.description.toLowerCase().indexOf(this.filterText.toLowerCase())!==-1): this.movies;
  }

  addToList($event:any,movie:Movie){
    if($event.target.classList.contains("btn-primary")){
      $event.target.innerText="Extract from List";
      $event.target.classList.remove("btn-primary");
      $event.target.classList.add("btn-danger");
    }else{
      $event.target.innerText="Add to List";
      $event.target.classList.remove("btn-danger");
      $event.target.classList.add("btn-primary");      
    }
  }

}
