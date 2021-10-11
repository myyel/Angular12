import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieRepository } from '../model/movie.repository';
import { Movie } from '../model/movies';
import { AlertifyService } from '../services/alertify.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  title="Movie List";
  movies:Movie[]=[];
  filteredMovies:Movie[]=[];

  filterText:string="";
  
  constructor(private alertify:AlertifyService,
              private http:HttpClient) { 
  }

  ngOnInit(): void {
    this.http.get<Movie[]>("http://localhost:3000/movies").subscribe(data=>{
      this.movies=data;      
      this.filteredMovies=this.movies;
    });
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

      this.alertify.success(movie.title+ " listene eklendi");
    }else{
      $event.target.innerText="Add to List";
      $event.target.classList.remove("btn-danger");
      $event.target.classList.add("btn-primary");      
      this.alertify.error(movie.title+ " listenden çıkarıldı");

    }
  }

}
