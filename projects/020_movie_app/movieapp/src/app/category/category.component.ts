import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoryRepository } from '../model/category.repository';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:Category[];
  categoryRepository: CategoryRepository;
  selectCategory:any=null;


  constructor() { 
    this.categoryRepository=new CategoryRepository();
    this.categories=this.categoryRepository.getCategories();
  }

  ngOnInit(): void {
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