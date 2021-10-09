import { Category } from "./category";

export class CategoryRepository{
    private categories:Category[];

    constructor(){
        this.categories=[
            {id:1,name:"Extreme"},
            {id:2,name:"Romantic"},
            {id:3,name:"Comedy"},
            {id:4,name:"Scine Function"},
          ];
    }

    getCategories():Category[]{
        return this.categories;
    }
}