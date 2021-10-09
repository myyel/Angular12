import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { TodoItem, TodoItem2 } from '../todoItem';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent{

  displayAll: boolean=true;

  inputTxt: string="";

  constructor() {
    this.model.items=this.getItemFromLocalStorage();
   }

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

  addItem(){
    if(this.inputTxt!=null){
      let data={description:this.inputTxt,action:false};
      this.model.items.push(data);

      let items=this.getItemFromLocalStorage();
      items.push(data);

      localStorage.setItem("items",JSON.stringify(items));
      this.inputTxt="";      
    }else{
      alert("bilgi giriniz");
    }
  }

  getItemFromLocalStorage(){
    let items: TodoItem2[]=[];
    let value=localStorage.getItem("items");

    if(value!=null){
      items=JSON.parse(value);
    }
    
    return items;
  }

  onActionChanged(item: TodoItem2){
    let items=this.getItemFromLocalStorage();

    localStorage.clear();

    items.forEach(i=>{
      if(i.description==item.description){
        i.action=item.action;
      }
    });

    localStorage.setItem("items",JSON.stringify(items));
  }

  displayCount(){
    return this.model.items.filter(i=>i.action).length;
  }

  getBtnClasses(){ 
    return {
    'disabled': this.inputTxt.length==0,
    'btn-secondary': this.inputTxt.length==0,
    'btn-primary': this.inputTxt.length>0
  };
  }

}
