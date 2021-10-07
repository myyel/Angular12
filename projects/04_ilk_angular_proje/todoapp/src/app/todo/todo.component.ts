import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { TodoItem, TodoItem2 } from '../todoItem';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent  {

  displayAll: boolean=true;

  constructor() { }

  model=new Model();

  
  getObjects(){
    if(this.displayAll==true){
      return this.model.items;
    }else{
      return this.model.items.filter(item=>item.action==false);
    }
  }

  getName(){
    return this.model.name;
  }

  addItem(input:string){
    this.model.items.push({description:input,action:true})
  }

}
