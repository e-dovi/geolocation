const sort=(o)=>{
    let swapping=true;
    let temp;
    while(swapping){
        swapping=false;
       for(let i=0; i<o.length-1; i++){
        if((Object.values(o[i])[0])>(Object.values(o[i+1])[0])){
            temp=o[i]
            o[i]=o[i+1]
            o[i+1]=temp;
            swapping=true;
        }
       }   
    }
// return the sorted array
    return o;
}

module.exports=sort;