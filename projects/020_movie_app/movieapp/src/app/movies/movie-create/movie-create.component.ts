import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageValidator } from 'src/assets/validators/image.validator';
import { Category } from '../../category/category.model';
import { AlertifyService } from '../../shared/alertify.service';
import { CategoryService } from '../../category/category.service';
import { MovieService } from '../movies.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers:[CategoryService, MovieService]
})
export class MovieCreateComponent implements OnInit {

  categories:Category[]=[];
  model:any={
  };

  constructor(private categoryService:CategoryService, private movieService:MovieService, private router:Router, private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }

  movieForm=new FormGroup({
    title: new FormControl("Title",[Validators.required, Validators.minLength(5)]),
    description: new FormControl("Description",[Validators.required]),
    imageUrl: new FormControl("Image",[Validators.required, ImageValidator.isValidExtention]),
    categoryId: new FormControl("-1",[Validators.required])
  }); 
  
  clearForm(){
    this.movieForm.patchValue({
      title:"",
      description:"",
      imageUrl:"",
      categoryId:"-1"
    });
  }

  createMovie(){

    const movie={
      id:0,
      title:this.movieForm.value.title, 
      description:this.movieForm.value.description, 
      imageUrl:this.movieForm.value.imageUrl, 
      categoryId:this.movieForm.value.categoryId,
      isPopular:false,
      datePublished:new Date().getTime()
    }

    this.movieService.createMovie(movie).subscribe(data=>{
      this.router.navigate(["/movies"])
    })
  }

}
