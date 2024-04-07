const haversine = require('haversine-distance');
const sort = require('./bubble');

/* const data = {
    "addresses": [
        "292 Main St Cambridge",
        "1115 Piedmont St SE Roanoke",
        "841 Broadway New York",
        "1921 w gate city blvd greensboro",
        "1834 Wake Forest Rd Winston Salem",
        "689 Rue Djable Lome Togo"
    ],
    "location": "pembroke rd greensboro"
} */
const getData = async (address, position) => {
    const ar = [];
    //console.log(position);
    let location = {}
    let distances=[];

   try{
        const resp = await fetch("https://api.radar.io/v1/geocode/forward?query="+position, { method: "GET", cache: 'no-cache', headers: {
            "Content-Type": "application/json",
            "Authorization":process.env.API_KEY}})
        //console.log(resp)
            if (resp.ok){
                const jsres = await resp.json()
                //console.log(jsres);
                location={'latitude':jsres.addresses[0]['latitude'], 'longitude':jsres.addresses[0]['longitude']}
                //console.log(location)
            }
        }
    catch(error){
        console.log(error)
                }
    
    for(let i = 0; i<address.length; i++){
        
        try{
        
        const response = await fetch("https://api.radar.io/v1/geocode/forward?query="+address[i], { method: "GET", cache: 'no-cache', headers: {
        "Content-Type": "application/json",
        "Authorization":process.env.API_KEY}})
    
        if (response.ok){
            const jres = await response.json()
            //console.log(jres);
            ar.push({[address[i]]:{'latitude':jres.addresses[0]['latitude'], 'longitude':jres.addresses[0]['longitude']}})
            // console.log(ar)
           
            //res.send(sort(distances))    
        }
        if(i === address.length-1){
            
            for(let o=0; o<ar.length; o++){
            distances.push({[Object.keys(ar[o]).toString()]:haversine(location, Object.values(ar[o])[0])})
            }
       //console.log(distances);
       
    }
       
           }
    catch(error){
        console.log(error)
    
    }}
     return (sort(distances))
}



  /*getData(data["addresses"], data["location"])
    .then(r => {
        console.log(r);
    })*/

    module.exports = getData;