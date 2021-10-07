export class TodoItem{
    description: string;
    action: string;

    constructor(description: string, action: string){
        this.description=description;
        this.action=action

    }
    
}


export interface TodoItem2{
    description: string;
    action: boolean;
}