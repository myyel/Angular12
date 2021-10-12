import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoryRepository } from '../model/category.repository';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[CategoryService]
})
export class CategoryComponent implements OnInit {

  categories:Category[]=[];
  selectCategory:any=null;


  constructor(private categoryService:CategoryService) { 
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories=data;
    })
  }

  displayAll=true;

  selectedCategory(category?:Category){
    if(category){      
    this.selectCategory=category;
    this.displayAll=false;
    }else{
      this.selectCategory=null;
    }
  }

}
