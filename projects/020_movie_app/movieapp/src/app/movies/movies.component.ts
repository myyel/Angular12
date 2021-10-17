import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../model/movies';
import { AlertifyService } from '../services/alertify.service';
import { MovieService } from '../services/movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers:[MovieService]
})
export class MoviesComponent implements OnInit {

  title="Movie List";
  movies:Movie[]=[];
  filteredMovies:Movie[]=[];
  errorMessage:string="";
  filterText:string="";
  loading:boolean=false;
  
  constructor(
    private alertify: AlertifyService, 
    private movieService: MovieService,
    private activatedRoute:ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.loading=true;
      this.movieService.getMovies(params["Id"]).subscribe(
        data=>{this.movies=data; this.filteredMovies=this.movies;
        this.loading=false;
        }, 
        error=>{this.errorMessage=error;
        this.loading=false;
        }
        );      
    })
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
