interface Point{
    x:number,
    y:number
}


interface Vehicle{
    currentLocation:Point;
    travelTo(point:Point): void;
}

class Taxi implements Vehicle{
    
    currentLocation:Point;
    travelTo(point:Point): void{
        console.log("taksi x: "+point.x+" konumundan y: "+point.y+ " konumuna gidiyor");
    }
}

class Bus {

}

let taxi_1:Taxi=new Taxi();
let taxi_2=new Taxi();

taxi_1.travelTo({x:1, y:2})

taxi_2.currentLocation={x:5,y:5}

