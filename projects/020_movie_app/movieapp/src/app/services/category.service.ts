import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../model/category";

@Injectable()
export class CategoryService{
    url:string="http://localhost:3000/category";

    constructor(private http:HttpClient){}

    getCategories():Observable<Category[]>{
        return this.http.get<Category[]>(this.url);
    }
}