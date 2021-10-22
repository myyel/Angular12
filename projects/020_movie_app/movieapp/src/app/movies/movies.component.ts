import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './movies';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { MovieService } from './movies.service';


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
  userId:string;
  loading:boolean=false;
  movieList:string[]=[];
  
  constructor(
    private alertify: AlertifyService, 
    private movieService: MovieService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthService
    ) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      this.userId=user.id;
      
    this.activatedRoute.params.subscribe(params=>{
      this.loading=true;
      this.movieService.getMovies(params["Id"]).subscribe(
        data=>{this.movies=data; this.filteredMovies=this.movies;

        this.movieService.getList(this.userId).subscribe(data=>{
          this.movieList=data;
          console.log(this.movieList);
        })
        this.loading=false;
        }, 
        error=>{this.errorMessage=error;
        this.loading=false;
        }
        );      
    })
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

      this.movieService.addToMyList({userId:this.userId, movieId:movie.id})
      .subscribe(()=>this.alertify.success(movie.title+ " listene eklendi"));


      
    }else{
      $event.target.innerText="Add to List";
      $event.target.classList.remove("btn-danger");
      $event.target.classList.add("btn-primary");      

      this.movieService.removeFromList({userId:this.userId, movieId:movie.id})
      .subscribe(()=>this.alertify.error(movie.title+ " listenden çıkarıldı"));

    }
  }

  getButtonState(movie:Movie){
    return this.movieList.findIndex(m=>m===movie.id) >-1 ;
  }

}
