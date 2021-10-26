const getAverage=(a:number,b:number,c?:number):string=>{
    const result =(a+b+c)/3;

    return "result: "+result;
}


function getAverage2(...a:number[]): string{
    let total=0;

    let count=0;

    for(let i=0; i<a.length; i++){
        total+=a[i];
        count++;
    }

    const result=total/count;

    return "result: "+result;

    
}

getAverage(10,20,30);

getAverage2(5,32,1,776,324)