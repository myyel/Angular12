import { TodoItem2 } from "./todoItem";

export class Model{
    name:string;
    items: TodoItem2[];

    constructor(){
        this.name="Mehmet YEL";
        this.items=[
            {description:"kahvaltı",action:false},
            {description:"spor",action:true},
            {description:"alışveriş",action:false}
        ]
    }
}