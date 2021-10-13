import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { AlertifyService } from '../services/alertify.service';
import { CategoryService } from '../services/category.service';
import { MovieService } from '../services/movies.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers:[CategoryService, MovieService]
})
export class MovieCreateComponent implements OnInit {

  categories:Category[]=[];
  model:any={};

  constructor(private categoryService:CategoryService, private movieService:MovieService, private router:Router, private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }

  createMovie(form:NgForm){

      console.log(form); 
    // const movie={
    //   id:0,
    //   title:title.value, 
    //   description:description.value, 
    //   imageUrl:imageUrl.value, 
    //   categoryId:categoryId.value,
    //   isPopular:false,
    //   datePublished:new Date().getTime()
    // }

    // this.movieService.createMovie(movie).subscribe(data=>{
    //   this.router.navigate(["/movies"])
    // })
  }

  log(value:any){
    console.log(value);
  }

}
